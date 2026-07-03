from fastapi import APIRouter, HTTPException

from app.schemas.menu_schema import MenuItemCreate
from app.services.menu_service import (
    create_menu_item,
    get_all_menu_items,
    get_menu_item_by_id,
    update_menu_item,
    delete_menu_item,
)

router = APIRouter(
    prefix="/menu",
    tags=["Menu"]
)


@router.post("/")
async def add_menu_item(item: MenuItemCreate):
    await create_menu_item(item)
    return {
        "message": "Menu item added successfully."
    }


@router.get("/")
async def get_menu():
    return await get_all_menu_items()


@router.get("/{item_id}")
async def get_menu_item(item_id: str):

    item = await get_menu_item_by_id(item_id)

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Menu item not found"
        )

    return item


@router.put("/{item_id}")
async def update_item(item_id: str, item: MenuItemCreate):

    updated = await update_menu_item(item_id, item)

    if updated == 0:
        raise HTTPException(
            status_code=404,
            detail="Menu item not found"
        )

    return {
        "message": "Menu updated successfully"
    }


@router.delete("/{item_id}")
async def delete_item(item_id: str):

    deleted = await delete_menu_item(item_id)

    if deleted == 0:
        raise HTTPException(
            status_code=404,
            detail="Menu item not found"
        )

    return {
        "message": "Menu deleted successfully"
    }