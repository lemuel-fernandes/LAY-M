from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from bson import ObjectId
from models.Certificates import CertificateModel, PyObjectId
from db.db import certificates_collection
from fastapi import APIRouter, HTTPException, Depends, status, Request
from datetime import datetime


router = APIRouter(prefix="/api/v1/certificates", tags=["Certificates"])


class CertificateModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: str
    email: EmailStr
    name: Optional[str] = None
    title: str
    description: Optional[str] = None
    issued_date: datetime
    expiry_date: Optional[datetime] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True


@router.post("/", response_model=CertificateModel)
async def create_certificate(certificate: CertificateModel):
    certificate.issued_date = certificate.issued_date or datetime.utcnow()
    result = await certificates_collection.insert_one(certificate.dict(by_alias=True))
    certificate.id = result.inserted_id
    return certificate


@router.get("/", response_model=List[CertificateModel])
async def list_certificates():
    certificates = []
    cursor = certificates_collection.find()
    async for doc in cursor:
        certificates.append(CertificateModel(**doc))
    return certificates


@router.get("/{certificate_id}", response_model=CertificateModel)
async def get_certificate(certificate_id: str):
    if not ObjectId.is_valid(certificate_id):
        raise HTTPException(status_code=400, detail="Invalid certificate ID")

    certificate = await certificates_collection.find_one({"_id": ObjectId(certificate_id)})
    if not certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")
    return CertificateModel(**certificate)


@router.delete("/{certificate_id}")
async def delete_certificate(certificate_id: str):
    if not ObjectId.is_valid(certificate_id):
        raise HTTPException(status_code=400, detail="Invalid certificate ID")

    result = await certificates_collection.delete_one({"_id": ObjectId(certificate_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Certificate not found")
    return {"message": "Certificate deleted"}


class CertificateIssue(BaseModel):
    user_id: str
    email: EmailStr
    name: Optional[str] = None
    title: str
    description: Optional[str] = None
    expiry_date: Optional[datetime] = None


@router.post("/issue", status_code=status.HTTP_201_CREATED)
async def issue_certificate(payload: CertificateIssue, request: Request):
    # create certificate record
    try:    
        uid = ObjectId(payload.user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user_id")

    cert_doc = {
        "user_id": uid,
        "email": str(payload.email),
        "name": payload.name,
        "title": payload.title,
        "description": payload.description,
        "issued_date": datetime.utcnow().isoformat(),
        "expiry_date": payload.expiry_date.isoformat() if payload.expiry_date else None,
    }

    res = await certificates_collection.insert_one(cert_doc)
    cert_doc["_id"] = res.inserted_id

    # send certificate email (non-blocking best-effort)
    try:
        # pass a plain dict expected by mail functions
        mail_payload = {
            "email": cert_doc["email"],
            "name": cert_doc.get("name"),
            "title": cert_doc["title"],
            "description": cert_doc.get("description"),
            "issued_date": cert_doc.get("issued_date"),
            "id": str(cert_doc["_id"]),
        }
        # fire-and-forget: schedule without awaiting to avoid blocking the response
        import asyncio
        loop = asyncio.get_event_loop()
        loop.create_task(request.app.state.loop.run_in_executor(None, mail.send_certificate_email_robust, mail_payload))
    except Exception as e:
        # Log but do not fail the issuance
        print(f"Failed to schedule certificate email: {e}")

    # return created certificate summary
    out = {k: (str(v) if isinstance(v, ObjectId) else v) for k, v in cert_doc.items()}
    return out
