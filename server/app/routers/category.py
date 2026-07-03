from fastapi import APIRouter, HTTPException

from app.schemas.category_schema import CategoryCreate
from app.services.category_service import (
    create_category,
    get_all_categories
)

router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.post("/")
async def add_category(category: CategoryCreate):

    new_category = await create_category(category)

    if new_category is None:
        raise HTTPException(
            status_code=400,
            detail="Category already exists."
        )

    return {
        "message": "Category created successfully."
    }


@router.get("/")
async def all_categories():
    return await get_all_categories()