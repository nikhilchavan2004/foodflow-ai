from fastapi import APIRouter, HTTPException

from app.schemas.order_schema import (
    OrderCreate,
    OrderStatusUpdate
)

from app.services.order_service import (
    create_order,
    get_user_orders,
    get_all_orders,
    update_order_status,
)

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.post("/")
async def place_order(order: OrderCreate):

    await create_order(order)

    return {
        "message": "Order placed successfully."
    }


@router.get("/")
async def all_orders():
    return await get_all_orders()


@router.get("/user/{user_id}")
async def user_orders(user_id: str):
    return await get_user_orders(user_id)


@router.put("/{order_id}/status")
async def change_status(
    order_id: str,
    status: OrderStatusUpdate
):

    updated = await update_order_status(
        order_id,
        status.status
    )

    if updated == 0:
        raise HTTPException(
            status_code=404,
            detail="Order not found."
        )

    return {
        "message": "Order status updated successfully."
    }