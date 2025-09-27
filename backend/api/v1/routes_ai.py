from fastapi import APIRouter, Request, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
# use role helper from auth utilities (middleware module only provides middleware class)

router = APIRouter(prefix="/api/v1/ai", tags=["ai"])

class PlanRequest(BaseModel):
    event_id: str
    constraints: Optional[dict] = None

class PredictRequest(BaseModel):
    event_id: str
    lookahead_days: Optional[int] = 7

class ReportRequest(BaseModel):
    event_id: str

@router.post("/project-plan", dependencies=[Depends(require_roles("organizer","admin"))])
async def project_plan(req: Request, payload: PlanRequest):
    ai = req.app.state.get("ai_service")
    if not ai:
        raise HTTPException(status_code=500, detail="AIService not available")
    plan = await ai.generate_project_plan(payload.event_id, constraints=payload.constraints)
    return {"event_id": payload.event_id, "project_plan": plan}

@router.post("/predict-tasks", dependencies=[Depends(require_roles("organizer","admin"))])
async def predict_tasks(req: Request, payload: PredictRequest):
    ai = req.app.state.get("ai_service")
    if not ai:
        raise HTTPException(status_code=500, detail="AIService not available")
    res = await ai.predictive_task_management(payload.event_id, lookahead_days=payload.lookahead_days or 7)
    return res

@router.post("/postevent-report", dependencies=[Depends(require_roles("organizer","admin"))])
async def postevent_report(req: Request, payload: ReportRequest):
    ai = req.app.state.get("ai_service")
    if not ai:
        raise HTTPException(status_code=500, detail="AIService not available")
    report = await ai.automated_postevent_report(payload.event_id)
    return {"event_id": payload.event_id, "report": report}