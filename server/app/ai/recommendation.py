import json

from app.ai.groq_client import client, MODEL
from app.ai.prompts import RECOMMENDATION_PROMPT


async def generate_recommendation(
    user_query: str,
    menu_items: list
):

    if not menu_items:
        return {
            "recommendation":
            "Sorry, I couldn't find any dishes matching your request. Try changing your preferences."
        }

    prompt = RECOMMENDATION_PROMPT.format(
        query=user_query,
        results=json.dumps(menu_items, indent=2,default=str)
    )

    response = client.chat.completions.create(
        model=MODEL,
        temperature=0.4,
        messages=[
            {
                "role": "system",
                "content":
                "You are FoodFlow AI, a restaurant recommendation assistant."
            },
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {
        "recommendation":
        response.choices[0].message.content
    }