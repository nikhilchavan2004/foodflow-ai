from fastapi import APIRouter
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from app.ai.groq_client import client, MODEL

from app.schemas.ai_schema import AIQuery
from app.ai.search_engine import search_food


router = APIRouter(
    prefix="/ai",
    tags=["AI Search"]
)


@router.post("/search")
async def search(data: AIQuery):
    return await search_food(data.query)