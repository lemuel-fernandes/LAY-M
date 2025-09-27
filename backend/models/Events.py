from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime
from bson import ObjectId


class EventStatusEnum(str, Enum):
    planned = "planned"
    ongoing = "ongoing"
    completed = "completed"
    canceled = "canceled"


class EventModel(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    title: str
    description: Optional[str] = None
    location: Optional[str] = None
    start_time: datetime
    end_time: datetime
    organizer_id: PyObjectId  
    attendees: List[PyObjectId] = Field(default_factory=list)  #
    status: EventStatusEnum = EventStatusEnum.planned
    max_attendees: Optional[int] = None

    @validator('end_time')
    def end_time_must_be_after_start_time(cls, v, values):
        if 'start_time' in values and v <= values['start_time']:
            raise ValueError('end_time must be after start_time')
        return v

    @validator('max_attendees')
    def max_attendees_must_be_positive(cls, v):
        if v is not None and v <= 0:
            raise ValueError('max_attendees must be a positive integer')
        return v

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
