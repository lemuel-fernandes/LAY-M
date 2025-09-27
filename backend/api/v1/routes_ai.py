from fastapi import APIRouter, Request, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Optional
from models.Users import RoleEnum  # Ensure this has RoleEnum defined
from db.db import users_collection
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from bson import ObjectId  # Required for MongoDB ObjectId handling

# Constants (you should use env vars in production)
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

# Auth token dependency
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")

# ----------------------- AUTH HELPERS -----------------------

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


def require_roles(*required_roles: RoleEnum):
    required_set = {r.value for r in required_roles}

    async def role_checker(current_user=Depends(get_current_user)):
        user_roles = set(current_user.get("roles", []))
        if not user_roles.intersection(required_set):
            raise HTTPException(status_code=403, detail="Not enough privileges")
        return current_user

    return role_checker

# ----------------------- ROUTER SETUP -----------------------

router = APIRouter(prefix="/api/v1/ai", tags=["ai"])

# ----------------------- MODELS -----------------------

class PlanRequest(BaseModel):
    event_id: str
    constraints: Optional[dict] = None

class PredictRequest(BaseModel):
    event_id: str
    lookahead_days: Optional[int] = 7

class ReportRequest(BaseModel):
    event_id: str

# ----------------------- ROUTES -----------------------

@router.post("/project-plan", dependencies=[Depends(require_roles(RoleEnum.event_manager))])
async def project_plan(req: Request, payload: PlanRequest):
    ai = req.app.state.get("ai_service")
    if not ai:
        raise HTTPException(status_code=500, detail="AIService not available")
    plan = await ai.generate_project_plan(payload.event_id, constraints=payload.constraints)
    return {"event_id": payload.event_id, "project_plan": plan}


@router.post("/predict-tasks", dependencies=[Depends(require_roles(RoleEnum.event_manager))])
async def predict_tasks(req: Request, payload: PredictRequest):
    ai = req.app.state.get("ai_service")
    if not ai:
        raise HTTPException(status_code=500, detail="AIService not available")
    res = await ai.predictive_task_management(payload.event_id, lookahead_days=payload.lookahead_days or 7)
    return res


@router.post("/postevent-report", dependencies=[Depends(require_roles(RoleEnum.event_manager))])
async def postevent_report(req: Request, payload: ReportRequest):
    ai = req.app.state.get("ai_service")
    if not ai:
        raise HTTPException(status_code=500, detail="AIService not available")
    report = await ai.automated_postevent_report(payload.event_id)
    return {"event_id": payload.event_id, "report": report}
