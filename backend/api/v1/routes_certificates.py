from fastapi import APIRouter, HTTPException
from typing import List
from bson import ObjectId
from datetime import datetime
from models.Certificates import CertificateModel, PyObjectId
from db.db import certificates_collection
router = APIRouter(prefix="/api/v1/certificates", tags=["Certificates"])


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
