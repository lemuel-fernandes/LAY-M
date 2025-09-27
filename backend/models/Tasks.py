from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId
from datetime import datetime


# Reuse the same PyObjectId helper
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
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class TaskModel(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    title: str
    description: Optional[str] = None
    completed: bool = False
    owner_id: PyObjectId  
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None
    due_date: Optional[datetime] = None
    priority: Optional[int] = Field(default=1, ge=1, le=5) 

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, datetime: lambda dt: dt.isoformat()}
