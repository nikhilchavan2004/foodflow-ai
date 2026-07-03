from app.database.mongodb import database

orders_collection = database["orders"]


async def dashboard_stats():

    orders = await orders_collection.find().sort("_id", -1).to_list(None)

    revenue = 0

    status = {
        "Placed": 0,
        "Confirmed": 0,
        "Preparing": 0,
        "Ready": 0,
        "Picked Up": 0,
    }

    popular = {}

    recent_orders = []

    for order in orders:

        revenue += order.get("total_amount", 0)

        st = order.get("status", "Placed")

        status[st] = status.get(st, 0) + 1

        for item in order.get("items", []):

            menu = item["menu_item_id"]

            popular[menu] = popular.get(menu, 0) + item["quantity"]

        recent_orders.append({
            "id": str(order["_id"]),
            "customer": order.get("user_id"),
            "amount": order.get("total_amount", 0),
            "status": order.get("status", "Placed"),
            "items": len(order.get("items", []))
        })

    return {
        "total_orders": len(orders),
        "revenue": revenue,
        "orders_by_status": status,
        "popular_items": sorted(
            popular.items(),
            key=lambda x: x[1],
            reverse=True
        )[:5],
        "recent_orders": recent_orders[:5]
    }