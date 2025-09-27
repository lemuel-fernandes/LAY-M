from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from bson import ObjectId
from enum import Enum
from datetime import datetime


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler):
        return {"type": "string", "pattern": "^[0-9a-fA-F]{24}$"}


class ContractStatus(str, Enum):
    pending = "pending"
    accepted = "accepted"
    declined = "declined"


class VendorContract(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    vendor_email: EmailStr
    needs: List[str]
    status: ContractStatus = ContractStatus.pending
    created_at: datetime = Field(default_factory=datetime.utcnow)
    responded_at: Optional[datetime] = None
    vendor_points: Optional[str] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
