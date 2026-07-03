import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import asyncio

from app.ai.query_builder import build_mongo_query

intent = {
    "dietary": "vegetarian",
    "spicy": True,
    "max_price": 200
}

print(build_mongo_query(intent))