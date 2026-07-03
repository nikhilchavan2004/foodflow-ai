from datetime import datetime

from app.database.mongodb import database

category_collection = database["categories"]


async def create_category(category):

    existing = await category_collection.find_one(
        {
            "name": category.name
        }
    )

    if existing:
        return None

    document = {
        "name": category.name,
        "description": category.description,
        "created_at": datetime.utcnow()
    }

    result = await category_collection.insert_one(document)

    document["_id"] = str(result.inserted_id)

    return document


async def get_all_categories():
    categories = []

    async for category in category_collection.find():
        category["_id"] = str(category["_id"])
        categories.append(category)

    return categories