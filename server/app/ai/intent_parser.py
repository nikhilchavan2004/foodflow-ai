import json

from app.ai.groq_client import client, MODEL
from app.ai.prompts import INTENT_PROMPT


async def extract_intent(user_query: str):

    response = client.chat.completions.create(
        model=MODEL,
        temperature=0,
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": INTENT_PROMPT
            },
            {
                "role": "user",
                "content": user_query
            }
        ]
    )

    return json.loads(
        response.choices[0].message.content
    )