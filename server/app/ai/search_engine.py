from app.ai.intent_parser import extract_intent
from app.ai.query_builder import build_mongo_query
from app.ai.retriever import retrieve_menu
from app.ai.recommendation import generate_recommendation


async def search_food(user_query: str):

    # Step 1
    intent = await extract_intent(user_query)

    # Step 2
    mongo_query = build_mongo_query(intent)

    # Step 3
    menu = await retrieve_menu(mongo_query)

    # Step 4
    recommendation = await generate_recommendation(
        user_query,
        menu
    )

    return {
        "intent": intent,
        "mongo_query": mongo_query,
        "results": menu,
        "recommendation": recommendation
    }