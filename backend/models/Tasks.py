from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId
from .Events import PyObjectId

class TaskModel(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    title: str = Field(..., description="Task title")
    description: Optional[str] = Field(None, description="Task description")
    event_id: Optional[PyObjectId] = Field(None, description="Associated event ID")
    assignee_id: Optional[PyObjectId] = Field(None, description="Assigned user ID")
    status: str = Field(default="pending", description="Task status")
    priority: int = Field(default=1, ge=1, le=5, description="Task priority (1-5)")
    due_date: Optional[datetime] = Field(None, description="Task due date")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
