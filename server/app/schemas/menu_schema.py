from pydantic import BaseModel, Field
from typing import Optional, List


class MenuItemCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    description: str
    price: float
    category: str
    image_url: Optional[str] = None
    is_available: bool = True

    # Optional AI-generated fields
    dietary_tag: Optional[str] = None
    spicy: Optional[bool] = None
    meal_type: Optional[str] = None
    cuisine: Optional[str] = None
    cooking_style: Optional[str] = None
    taste_tags: Optional[List[str]] = None
    health_tags: Optional[List[str]] = None


class MenuItemResponse(BaseModel):
    id: str
    name: str
    description: str
    price: float
    category: str
    image_url: Optional[str]
    is_available: bool