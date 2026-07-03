from pydantic import BaseModel
from typing import List, Literal
from datetime import datetime


class OrderItem(BaseModel):
    menu_item_id: str
    quantity: int
    price: float


class OrderCreate(BaseModel):
    user_id: str
    items: List[OrderItem]
    total_amount: float


class OrderStatusUpdate(BaseModel):
    status: Literal[
        "Placed",
        "Confirmed",
        "Preparing",
        "Ready",
        "Picked Up",
        "Cancelled"
    ]


class OrderResponse(BaseModel):
    id: str
    user_id: str
    items: List[OrderItem]
    total_amount: float
    status: str
    created_at: datetime