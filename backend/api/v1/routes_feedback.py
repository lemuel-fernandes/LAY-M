from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from models.Feedback import FeedbackModel, FeedbackType
from models.Events import EventModel
from services.feedback_service import FeedbackAnalyzer
from datetime import datetime
from db.db import db

router = APIRouter(
    prefix="/api/v1/feedback",
    tags=["feedback"]
)

feedback_analyzer = FeedbackAnalyzer()

@router.post("/", response_model=FeedbackModel)
async def create_feedback(feedback: FeedbackModel):
    # Check if event exists
    event = await db.events.find_one({"_id": feedback.event_id})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    # Create the feedback
    result = await db.feedback.insert_one(feedback.dict(by_alias=True))
    created_feedback = await db.feedback.find_one({"_id": result.inserted_id})
    return FeedbackModel(**created_feedback)

@router.get("/event/{event_id}", response_model=List[FeedbackModel])
async def get_event_feedback(event_id: str):
    feedbacks = await db.feedback.find({"event_id": event_id}).to_list(None)
    if not feedbacks:
        raise HTTPException(status_code=404, detail="No feedback found for this event")
    return [FeedbackModel(**feedback) for feedback in feedbacks]

@router.get("/event/{event_id}/report")
async def get_event_report(event_id: str):
    try:
        feedbacks = await db.feedback.find({"event_id": event_id}).to_list(None)
        if not feedbacks:
            raise HTTPException(status_code=404, detail="No feedback found for this event")
        
        # Basic report analytics
        total_feedbacks = len(feedbacks)
        avg_rating = sum(f["rating"] for f in feedbacks) / total_feedbacks
        
        return {
            "total_feedbacks": total_feedbacks,
            "average_rating": avg_rating,
            "feedback_types": {
                FeedbackType.general.value: len([f for f in feedbacks if f["type"] == FeedbackType.general.value]),
                FeedbackType.speaker.value: len([f for f in feedbacks if f["type"] == FeedbackType.speaker.value]),
                FeedbackType.venue.value: len([f for f in feedbacks if f["type"] == FeedbackType.venue.value]),
                FeedbackType.organization.value: len([f for f in feedbacks if f["type"] == FeedbackType.organization.value])
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))