import re

from app.database.mongodb import database

menu_collection = database["menu_items"]


async def ai_search(query: str):
    q = query.lower()

    filters = {
        "is_available": True
    }

    # Dietary filters
    if "vegetarian" in q or "veg" in q:
        filters["dietary_tag"] = "vegetarian"

    elif "non vegetarian" in q or "non-veg" in q:
        filters["dietary_tag"] = "non-vegetarian"

    # Spice filter
    if "spicy" in q:
        filters["spicy"] = True

    # Price filter
    price = re.findall(r"\d+", q)

    if price:
        filters["price"] = {
            "$lte": float(price[0])
        }

    print("MongoDB Filters:", filters)

    items = await menu_collection.find(filters).to_list(None)

    for index, item in enumerate(items):
        item["_id"] = str(item["_id"])

        # Frontend helpers
        item["match"] = f"{max(90, 98 - index * 2)}%"
        item["reason"] = f"Recommended because it matches '{query}'."

        if "preparation_time" not in item:
            item["preparation_time"] = 15

        if "rating" not in item:
            item["rating"] = 4.8

    return {
        "results": items,
        "recommendation": (
            f"I found {len(items)} dish(es) matching your request."
            if items
            else "I couldn't find an exact match. Try a broader search."
        ),
        "intent": {
            "query": query,
            "filters": filters
        }
    }