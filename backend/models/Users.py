from pydantic import BaseModel, EmailStr, Field,validator
from typing import Optional
from bson import ObjectId


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
        return {
            "type": "string",
            "pattern": "^[0-9a-fA-F]{24}$",
        }


class UserModel(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    email: EmailStr
    username: str
    full_name: Optional[str]
    password: str
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False

    @validator('password')
    def validate_password(cls, v):
        if len(v.encode('utf-8')) > 200:  # Reasonable limit
            raise ValueError('Password is too long (max 200 bytes)')
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v

    model_config = {
        "populate_by_name": True,
        "arbitrary_types_allowed": True,
        "json_encoders": {ObjectId: str},
    }
