from fastapi import APIRouter, HTTPException, Path, Body, Depends, Request, status
from pydantic import BaseModel, Field
from typing import List, Optional
from bson import ObjectId
from db.db import events_collection, users_collection
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

# Set up your router
router = APIRouter(prefix="/api/v1/events", tags=["events", "volunteers"])

# Auth config (you should load these from environment/config in production)
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")

# ------------------ Models ------------------ #

class VolunteerJoin(BaseModel):
    user_id: str = Field(..., description="User ObjectId as string")
    profile: Optional[dict] = Field(None, description="Volunteer profile snapshot (skills, availability, bio)")

class VolunteerOut(BaseModel):
    user_id: str
    profile: Optional[dict] = None

    class Config:
        orm_mode = True

# ------------------ Auth Dependencies ------------------ #

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = await users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise credentials_exception
    return user

def require_roles(*required_roles):
    async def role_checker(current_user=Depends(get_current_user)):
        user_roles = set(current_user.get("roles", []))
        if not user_roles.intersection(required_roles):
            raise HTTPException(status_code=403, detail="Not enough privileges")
        return current_user
    return role_checker

# ------------------ Routes ------------------ #

@router.post("/{event_id}/volunteers", status_code=status.HTTP_201_CREATED)
async def join_event(
    event_id: str = Path(...),
    payload: VolunteerJoin = Body(...),
    current_user=Depends(get_current_user)
):
    try:
        eid = ObjectId(event_id)
        uid = ObjectId(payload.user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid id format")

    # Restrict users to joining only themselves unless admin/organizer
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
    current_user=Depends(get_current_user)
):
    try:
        eid = ObjectId(event_id)
        uid = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid id format")

    # Only self or admin/organizer can remove
    if str(current_user.get("_id")) != user_id and not set(current_user.get("roles", [])).intersection({"admin", "organizer"}):
        raise HTTPException(status_code=403, detail="Not allowed to remove this volunteer")

    res = await events_collection.update_one(
        {"_id": eid},
        {"$pull": {"volunteers": {"user_id": uid}}}
    )

    if res.modified_count == 0:
        raise HTTPException(status_code=404, detail="Volunteer or event not found")

    return {"msg": "Volunteer removed from event"}


@router.get("/{event_id}/volunteers", response_model=List[VolunteerOut])
async def list_volunteers(
    event_id: str = Path(...),
    current_user=Depends(get_current_user)
):
    try:
        eid = ObjectId(event_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid id format")

    event = await events_collection.find_one({"_id": eid})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    allowed_roles = set(current_user.get("roles", []))
    is_participant = any(str(v.get("user_id")) == str(current_user.get("_id")) for v in event.get("volunteers", []))

    if not (is_participant or allowed_roles.intersection({"admin", "organizer"})):
        raise HTTPException(status_code=403, detail="Not allowed to list volunteers for this event")

    # Convert ObjectId to string for response
    out = []
    for v in event.get("volunteers", []):
        out.append({
            "user_id": str(v.get("user_id")),
            "profile": v.get("profile", {})
        })

    return out


@router.get("/{event_id}/volunteer-recommendations")
async def volunteer_recommendations(
    request: Request,
    event_id: str = Path(...),
    limit: int = 10,
    current_user=Depends(require_roles("organizer", "admin"))
):
    ai = request.app.state.get("ai_service")
    if not ai:
        raise HTTPException(status_code=500, detail="AIService not available")

    recs = await ai.recommend_volunteers(event_id, limit=limit)
    return {
        "event_id": event_id,
        "recommendations": recs
    }
