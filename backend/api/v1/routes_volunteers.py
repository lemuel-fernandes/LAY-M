from fastapi import APIRouter, HTTPException, Path, Body, Depends, Request
from pydantic import BaseModel, Field
from typing import List, Optional
from bson import ObjectId
from db.db import events_collection, users_collection
from fastapi import status
from services.auth_utils import get_current_user, require_roles

router = APIRouter(prefix="/api/v1/events", tags=["events", "volunteers"])

class VolunteerJoin(BaseModel):
    user_id: str = Field(..., description="User ObjectId as string")
    profile: Optional[dict] = Field(None, description="Volunteer profile snapshot (skills, availability, bio)")

@router.post("/{event_id}/volunteers", status_code=status.HTTP_201_CREATED)
async def join_event(
    event_id: str = Path(...),
    payload: VolunteerJoin = Body(...),
    current_user = Depends(get_current_user)
):
    try:
        eid = ObjectId(event_id)
        uid = ObjectId(payload.user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid id format")

    # Only allow a user to join as themselves unless they have organizer/admin role
    if str(current_user.get("_id")) != payload.user_id and not set(current_user.get("roles", [])).intersection({"admin", "organizer"}):
        raise HTTPException(status_code=403, detail="Not allowed to register other users")

    event = await events_collection.find_one({"_id": eid})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    volunteer_entry = {
        "user_id": uid,
        "profile": payload.profile or {},
    }
    await events_collection.update_one(
        {"_id": eid, "volunteers.user_id": {"$ne": uid}},
        {"$push": {"volunteers": volunteer_entry}}
    )
    return {"msg": "Joined event as volunteer"}

@router.delete("/{event_id}/volunteers/{user_id}")
async def leave_event(
    event_id: str = Path(...),
    user_id: str = Path(...),
    current_user = Depends(get_current_user)
):
    try:
        eid = ObjectId(event_id)
        uid = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid id format")

    # Only allow user to remove themselves or organizer/admin to remove any volunteer
    if str(current_user.get("_id")) != user_id and not set(current_user.get("roles", [])).intersection({"admin", "organizer"}):
        raise HTTPException(status_code=403, detail="Not allowed to remove this volunteer")

    res = await events_collection.update_one({"_id": eid}, {"$pull": {"volunteers": {"user_id": uid}}})
    if res.modified_count == 0:
        raise HTTPException(status_code=404, detail="Volunteer or event not found")
    return {"msg": "Volunteer removed from event"}

@router.get("/{event_id}/volunteers", response_model=List[dict])
async def list_volunteers(
    event_id: str = Path(...),
    current_user = Depends(get_current_user)
):
    try:
        eid = ObjectId(event_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid id format")

    # allow listing to organizers/admins or participants
    event = await events_collection.find_one({"_id": eid})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    allowed_roles = set(current_user.get("roles", []))
    is_participant = any(str(v.get("user_id")) == str(current_user.get("_id")) for v in event.get("volunteers", []))

    if not (is_participant or allowed_roles.intersection({"admin", "organizer"})):
        raise HTTPException(status_code=403, detail="Not allowed to list volunteers for this event")

    vols = event.get("volunteers", [])
    out = []
    for v in vols:
        v2 = dict(v)
        if isinstance(v2.get("user_id"), ObjectId):
            v2["user_id"] = str(v2["user_id"])
        out.append(v2)
    return out

@router.get("/{event_id}/volunteer-recommendations")
async def volunteer_recommendations(request: Request, event_id: str = Path(...), limit: int = 10, current_user = Depends(require_roles("organizer","admin"))):
    # requires organizer/admin role
    ai = request.app.state.get("ai_service")
    if not ai:
        raise HTTPException(status_code=500, detail="AIService not available")
    recs = await ai.recommend_volunteers(event_id, limit=limit)
    return {"event_id": event_id, "recommendations": recs}