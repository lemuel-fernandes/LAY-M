from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
from models.Tasks import TaskModel
from db.db import db

router = APIRouter(
    prefix="/api/v1/tasks",
    tags=["tasks"]
)

@router.post("/", response_model=TaskModel)
async def create_task(task: TaskModel):
    task_dict = task.dict(by_alias=True)
    task_dict["created_at"] = datetime.utcnow()
    task_dict["updated_at"] = datetime.utcnow()
    
    result = await db.tasks.insert_one(task_dict)
    created_task = await db.tasks.find_one({"_id": result.inserted_id})
    
    return TaskModel(**created_task)

@router.get("/", response_model=List[TaskModel])
async def get_tasks():
    tasks = await db.tasks.find().to_list(None)
    return [TaskModel(**task) for task in tasks]

@router.get("/{task_id}", response_model=TaskModel)
async def get_task(task_id: str):
    task = await db.tasks.find_one({"_id": task_id})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return TaskModel(**task)

@router.put("/{task_id}", response_model=TaskModel)
async def update_task(task_id: str, task: TaskModel):
    task_dict = task.dict(exclude_unset=True)
    task_dict["updated_at"] = datetime.utcnow()
    
    result = await db.tasks.update_one(
        {"_id": task_id},
        {"$set": task_dict}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
        
    updated_task = await db.tasks.find_one({"_id": task_id})
    return TaskModel(**updated_task)

@router.delete("/{task_id}")
async def delete_task(task_id: str):
    result = await db.tasks.delete_one({"_id": task_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}