from pydantic import BaseModel


class AIQuery(BaseModel):
    query: str

from pydantic import BaseModel
from typing import Optional


class SearchIntent(BaseModel):
    dietary: Optional[str] = None
    spicy: bool = False
    max_price: Optional[float] = None

    category: Optional[str] = None
    cuisine: Optional[str] = None
    cooking_style: Optional[str] = None

    healthy: bool = False
    high_protein: bool = False

    keywords: list[str] = []