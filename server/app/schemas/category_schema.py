from datetime import datetime
from pydantic import BaseModel, Field


class CategoryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    description: str | None = None


class CategoryResponse(BaseModel):
    id: str
    name: str
    description: str | None
    created_at: datetime