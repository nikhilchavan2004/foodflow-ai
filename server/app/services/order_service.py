from datetime import datetime
from bson import ObjectId

from app.database.mongodb import database

orders_collection = database["orders"]


async def create_order(order):

    document = {
        "user_id": order.user_id,
        "items": [item.dict() for item in order.items],
        "total_amount": order.total_amount,
        "status": "Placed",
        "created_at": datetime.utcnow()
    }

    result = await orders_collection.insert_one(document)

    document["_id"] = str(result.inserted_id)

    return document


async def get_user_orders(user_id: str):

    orders = []

    async for order in orders_collection.find({"user_id": user_id}):
        order["_id"] = str(order["_id"])
        orders.append(order)

    return orders


async def get_all_orders():

    orders = []

    async for order in orders_collection.find():
        order["_id"] = str(order["_id"])
        orders.append(order)

    return orders


async def update_order_status(order_id: str, status: str):

    result = await orders_collection.update_one(
        {"_id": ObjectId(order_id)},
        {
            "$set": {
                "status": status
            }
        }
    )

    return result.modified_count