from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1.routes_auth import router as auth_router
from api.v1.routes_task import router as task_router  # Add this import
from api.v1.routes_events import router as events_router
from api.v1.routes_feedback import router as feedback_router
from db.db import client as mongo_client  
from services.authMiddleware import AuthMiddleware
from pymongo.errors import PyMongoError
from api.v1.routes_vendor import router as vendor_router
from api.v1.routes_certificates import router as certificates_router
from api.v1.routes_gallery import router as gallery_router
app = FastAPI()
app.add_middleware( 
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

protected_routes = ["/api/v1/tasks", "/api/v1/users/me", 'api/v1/events']
app.add_middleware(AuthMiddleware, protected_paths=protected_routes)
protected_routes_roles = {}


# Include all routers
app.include_router(auth_router)
app.include_router(task_router)  # Add this line
app.include_router(events_router)
app.include_router(vendor_router)
app.include_router(certificates_router)
app.include_router(gallery_router)

@app.on_event("startup")
async def startup_db():
    app.state.mongo_client = mongo_client
    app.state.db = mongo_client["local"]


@app.get("/")
def hello():
    return {"Hello": "World"}


@app.get("/api/v1/db/status")
async def db_status():
    try:
        # The ping command is cheap and does not require auth
        await app.state.db.command("ping")
        return {"status": "connected"}
    except PyMongoError as e:
        return {"status": "disconnected", "error": str(e)}
