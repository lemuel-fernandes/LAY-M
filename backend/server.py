from typing import Union

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1.routes_auth import router as auth_router
from db.db import client as mongo_client  # Import the shared client

from pymongo.errors import PyMongoError

app = FastAPI()
app.add_middleware( 
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)


@app.on_event("startup")
async def startup_db():
    # Use the shared client from db.db
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
