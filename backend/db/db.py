
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import asyncio
import os
load_dotenv()
DB_URI = os.getenv("DB_URI")
client = AsyncIOMotorClient(DB_URI, server_api=ServerApi("1"))

db = client['local']

users_collection = db['users']
tasks_collection = db['tasks']
