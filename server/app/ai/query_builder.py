def build_mongo_query(intent: dict):

    query = {
        "is_available": True
    }

    # Dietary
    if intent.get("dietary"):
        query["dietary_tag"] = intent["dietary"]

    # Spicy
    if intent.get("spicy"):
        query["spicy"] = True

    # Price
    if intent.get("max_price"):
        query["price"] = {
            "$lte": intent["max_price"]
        }

    # Category
    if intent.get("category"):
        query["category"] = intent["category"]

    # Cuisine
    if intent.get("cuisine"):
        query["cuisine"] = intent["cuisine"]

    # Cooking Style
    if intent.get("cooking_style"):
        query["cooking_style"] = intent["cooking_style"]

    # High Protein
    if intent.get("high_protein"):
        query["health_tags"] = "High Protein"

    return query