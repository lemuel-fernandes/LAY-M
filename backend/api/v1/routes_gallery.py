from fastapi import APIRouter, HTTPException
from typing import List
from bson import ObjectId
from datetime import datetime
from models.Gallery import GalleryItemModel, PyObjectId
from db.db import gallery_collection  
router = APIRouter(prefix="/api/v1/gallery", tags=["Gallery"])


@router.post("/", response_model=GalleryItemModel)
async def create_gallery_item(item: GalleryItemModel):
    item.uploaded_at = item.uploaded_at or datetime.utcnow()
    result = await gallery_collection.insert_one(item.dict(by_alias=True))
    item.id = result.inserted_id
    return item


@router.get("/", response_model=List[GalleryItemModel])
async def list_gallery_items():
    items = []
    cursor = gallery_collection.find()
    async for doc in cursor:
        items.append(GalleryItemModel(**doc))
    return items


@router.get("/{item_id}", response_model=GalleryItemModel)
async def get_gallery_item(item_id: str):
    if not ObjectId.is_valid(item_id):
        raise HTTPException(status_code=400, detail="Invalid item ID")

    item = await gallery_collection.find_one({"_id": ObjectId(item_id)})
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return GalleryItemModel(**item)


@router.delete("/{item_id}")
async def delete_gallery_item(item_id: str):
    if not ObjectId.is_valid(item_id):
        raise HTTPException(status_code=400, detail="Invalid item ID")

    result = await gallery_collection.delete_one({"_id": ObjectId(item_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Gallery item deleted"}
