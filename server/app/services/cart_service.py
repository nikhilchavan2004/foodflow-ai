from datetime import datetime
from bson import ObjectId

from app.database.mongodb import database

cart_collection = database["cart"]


async def add_to_cart(user_id: str, item):

    existing = await cart_collection.find_one(
        {
            "user_id": user_id,
            "menu_item_id": item.menu_item_id,
        }
    )

    if existing:

        await cart_collection.update_one(
            {"_id": existing["_id"]},
            {
                "$inc": {
                    "quantity": item.quantity
                }
            },
        )

        return

    await cart_collection.insert_one(
        {
            "user_id": user_id,
            "menu_item_id": item.menu_item_id,
            "quantity": item.quantity,
            "created_at": datetime.utcnow(),
        }
    )

async def get_cart(user_id: str):

    cart = []

    async for item in cart_collection.find(
        {
            "user_id": user_id
        }
    ):
        item["_id"] = str(item["_id"])
        cart.append(item)

    return cart


async def remove_from_cart(cart_id: str):

    result = await cart_collection.delete_one(
        {
            "_id": ObjectId(cart_id)
        }
    )

    return result.deleted_count