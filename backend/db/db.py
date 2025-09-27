from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import asyncio
import os

load_dotenv()
DB_URI = os.getenv("DB_URI")

client = AsyncIOMotorClient(DB_URI, server_api=ServerApi("1"))

# Use your database here
db = client['myappdb']

users_collection = db['users']
tasks_collection = db['tasks']
events_collection = db['events']

async def create_collections():
    await users_collection.insert_one({"init": "users_collection"})
    await tasks_collection.insert_one({"init": "tasks_collection"})

if __name__ == "__main__":
    asyncio.run(create_collections())
