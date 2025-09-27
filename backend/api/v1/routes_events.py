from fastapi import APIRouter, HTTPException, status
from typing import List
from bson import ObjectId

from models.Events import EventModel, PyObjectId
from db.db import events_collection  
router = APIRouter(prefix="/api/v1/events", tags=["Events"])

def event_helper(event) -> EventModel:
    event["id"] = event["_id"]
    return EventModel(**event)

@router.post("/", response_model=EventModel, status_code=status.HTTP_201_CREATED)
async def create_event(event: EventModel):
    event_dict = event.dict(by_alias=True)
    event_dict.pop("id", None)
    result = await events_collection.insert_one(event_dict)
    created_event = await events_collection.find_one({"_id": result.inserted_id})
    return event_helper(created_event)

@router.get("/", response_model=List[EventModel])
async def get_all_events():
    events_cursor = events_collection.find()
    events = []
    async for event in events_cursor:
        events.append(event_helper(event))
    return events

@router.get("/{event_id}", response_model=EventModel)
async def get_event(event_id: str):
    if not ObjectId.is_valid(event_id):
        raise HTTPException(status_code=400, detail="Invalid event ID")
    event = await events_collection.find_one({"_id": ObjectId(event_id)})
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return event_helper(event)

@router.put("/{event_id}", response_model=EventModel)
async def update_event(event_id: str, event: EventModel):
    if not ObjectId.is_valid(event_id):
        raise HTTPException(status_code=400, detail="Invalid event ID")
    event_dict = event.dict(by_alias=True)
    event_dict.pop("id", None)
    result = await events_collection.update_one({"_id": ObjectId(event_id)}, {"$set": event_dict})
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Event not found or no changes made")
    updated_event = await events_collection.find_one({"_id": ObjectId(event_id)})
    return event_helper(updated_event)

@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_event(event_id: str):
    if not ObjectId.is_valid(event_id):
        raise HTTPException(status_code=400, detail="Invalid event ID")
    result = await events_collection.delete_one({"_id": ObjectId(event_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return None
