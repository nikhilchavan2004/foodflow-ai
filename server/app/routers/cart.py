from fastapi import APIRouter, HTTPException
from fastapi import Depends

from app.auth.jwt_handler import get_current_user
from app.schemas.cart_schema import CartItemCreate
from app.services.cart_service import (
    add_to_cart,
    get_cart,
    remove_from_cart,
)

router = APIRouter(
    prefix="/cart",
    tags=["Cart"]
)


@router.post("/")
async def add_item(
    item: CartItemCreate,
    current_user=Depends(get_current_user)
):

    await add_to_cart(
        current_user["user_id"],
        item
    )

    return {
        "message": "Item added to cart."
    }

@router.get("/{user_id}")
async def user_cart(user_id: str):
    return await get_cart(user_id)


@router.delete("/{cart_id}")
async def delete_cart_item(cart_id: str):

    deleted = await remove_from_cart(cart_id)

    if deleted == 0:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found."
        )

    return {
        "message": "Item removed from cart."
    }