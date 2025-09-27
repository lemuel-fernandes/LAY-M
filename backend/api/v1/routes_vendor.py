from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from models.Vendor import VendorContract, ContractStatus
from db.db import vendors_collection
from services.mail import send_contract_email 

router = APIRouter(prefix="/api/v1/vendors", tags=["Vendors"])


class CreateContractRequest(BaseModel):
    vendor_email: EmailStr
    needs: List[str]


class AcceptOrDeclineRequest(BaseModel):
    contract_id: str
    action: ContractStatus  # accepted or declined
    vendor_points: Optional[str] = None


@router.post("/createContract")
async def create_contract(data: CreateContractRequest, background_tasks: BackgroundTasks):
    contract = VendorContract(
        vendor_email=data.vendor_email,
        needs=data.needs
    )
    insert_result = await vendors_collection.insert_one(contract.dict(by_alias=True))
    contract.id = insert_result.inserted_id

    background_tasks.add_task(send_contract_email, contract)

    return {"message": "Contract created and email sent", "contract_id": str(contract.id)}


@router.post("/acceptOrDecline")
async def respond_to_contract(data: AcceptOrDeclineRequest):
    contract_id = data.contract_id

    if not ObjectId.is_valid(contract_id):
        raise HTTPException(status_code=400, detail="Invalid contract ID")

    contract = await vendors_collection.find_one({"_id": ObjectId(contract_id)})

    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")

    if contract["status"] != ContractStatus.pending:
        raise HTTPException(status_code=400, detail="Contract already responded to")

    update_data = {
        "status": data.action,
        "responded_at": datetime.utcnow(),
    }

    if data.action == ContractStatus.accepted:
        if not data.vendor_points:
            raise HTTPException(status_code=400, detail="Must provide vendor_points when accepting")
        update_data["vendor_points"] = data.vendor_points

    await vendors_collection.update_one(
        {"_id": ObjectId(contract_id)},
        {"$set": update_data}
    )

    return {"message": f"Contract {data.action}"}

@router.post("/test-email")
async def test_email():
    from models.Vendor import VendorContract
    test_contract = VendorContract(
        vendor_email="askari.abidi.2005@gmail.com",
        needs=["Test Service 1", "Test Service 2"]
    )
    test_contract.id = "test-id"
    
    success = send_contract_email(test_contract)
    return {"success": success}