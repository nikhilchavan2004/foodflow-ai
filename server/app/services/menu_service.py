from datetime import datetime

from app.ai.auto_tagger import generate_tags
from app.database.mongodb import database

menu_collection = database["menu_items"]


async def create_menu_item(item):

    ai_tags = await generate_tags(
        item.name,
        item.description
    )

    document = {
        "name": item.name,
        "description": item.description,
        "price": item.price,
        "category": item.category,
        "image_url": item.image_url,
        "is_available": item.is_available,

        "dietary_tag": ai_tags["dietary_tag"],
        "spicy": ai_tags["spicy"],
        "meal_type": ai_tags["meal_type"],
        "cuisine": ai_tags["cuisine"],
        "cooking_style": ai_tags["cooking_style"],
        "taste_tags": ai_tags["taste_tags"],
        "health_tags": ai_tags["health_tags"],

        "created_at": datetime.utcnow()
    }

    result = await menu_collection.insert_one(document)

    document["_id"] = str(result.inserted_id)

    return document


async def get_all_menu_items():

    items = []

    async for item in menu_collection.find():
        item["_id"] = str(item["_id"])
        items.append(item)

    return items
from bson import ObjectId

async def get_menu_item_by_id(item_id: str):
    item = await menu_collection.find_one({"_id": ObjectId(item_id)})

    if item:
        item["_id"] = str(item["_id"])

    return item
async def update_menu_item(item_id: str, item):

    result = await menu_collection.update_one(
        {"_id": ObjectId(item_id)},
        {
            "$set": {
                "name": item.name,
                "description": item.description,
                "price": item.price,
                "category": item.category,
                "image_url": item.image_url,
                "is_available": item.is_available,
                "dietary_tag": item.dietary_tag,
                "spicy": item.spicy
            }
        }
    )

    return result.modified_count
async def delete_menu_item(item_id: str):
    result = await menu_collection.delete_one(
        {"_id": ObjectId(item_id)}
    )

    return result.deleted_count