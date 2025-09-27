from pydantic import BaseModel, EmailStr, Field, validator, ValidationError
from typing import Optional, List
from enum import Enum
from bson import ObjectId


class RoleEnum(str, Enum):
    event_manager = "event_manager"
    user = "user"
    event_staff = "event_staff"


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
    full_name: Optional[str] = None
    password: str
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False
    roles: List[RoleEnum] = Field(default_factory=lambda: [RoleEnum.event_manager, RoleEnum.user, RoleEnum.event_staff])

    @validator('password')
    def validate_password(cls, v):
        if len(v.encode('utf-8')) > 200:
            raise ValueError('Password is too long (max 200 bytes)')
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v

    @validator('roles')
    def validate_roles(cls, v):
        invalid_roles = [role for role in v if role not in RoleEnum]
        if invalid_roles:
            raise ValueError(f"Invalid roles found: {invalid_roles}")
        return v

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
