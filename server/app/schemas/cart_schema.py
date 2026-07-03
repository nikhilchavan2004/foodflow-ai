from pydantic import BaseModel, Field


class CartItemCreate(BaseModel):
    menu_item_id: str
    quantity: int = Field(..., gt=0)


class CartItemUpdate(BaseModel):
    quantity: int = Field(..., gt=0)