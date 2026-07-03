from app.database.mongodb import database

menu_collection = database["menu_items"]


async def retrieve_menu(query: dict):

    results = await menu_collection.find(query).to_list(None)

    for item in results:
        item["_id"] = str(item["_id"])

    return results