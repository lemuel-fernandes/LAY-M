from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from bson import ObjectId
from enum import Enum
from .Events import PyObjectId, EventModel

class FeedbackType(str, Enum):
    general = "general"
    speaker = "speaker"
    venue = "venue"
    organization = "organization"

class FeedbackModel(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    event_id: PyObjectId
    user_id: PyObjectId
    type: FeedbackType = Field(default=FeedbackType.general)
    rating: int = Field(..., ge=1, le=5, description="Rating from 1-5")
    comment: str = Field(..., min_length=1)
    sentiment_score: Optional[float] = None
    key_topics: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}