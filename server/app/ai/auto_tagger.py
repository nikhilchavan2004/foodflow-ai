import json

from app.ai.groq_client import client, MODEL

PROMPT = """
You are a food expert.

Generate metadata for the menu item.

Return ONLY valid JSON.

Schema:

{
"dietary_tag":"",
"spicy":false,
"meal_type":"",
"cuisine":"",
"cooking_style":"",
"taste_tags":[],
"health_tags":[]
}
"""


async def generate_tags(name: str, description: str):

    response = client.chat.completions.create(

        model=MODEL,

        temperature=0,

        response_format={
            "type": "json_object"
        },

        messages=[
            {
                "role": "system",
                "content": PROMPT
            },
            {
                "role": "user",
                "content":
                f"""
                Name:
                {name}

                Description:
                {description}
                """
            }
        ]
    )

    return json.loads(
        response.choices[0].message.content
    )