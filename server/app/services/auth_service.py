from datetime import datetime

from app.auth.password import hash_password, verify_password
from app.database.mongodb import database

users_collection = database["users"]


async def create_user(user):
    existing_user = await users_collection.find_one(
        {"email": user.email}
    )

    if existing_user:
        return None

    new_user = {
        "full_name": user.full_name,
        "email": user.email,
        "password": hash_password(user.password),
        "role": user.role,
        "is_active": True,
        "created_at": datetime.utcnow(),
    }

    result = await users_collection.insert_one(new_user)

    new_user["_id"] = str(result.inserted_id)

    return new_user


async def authenticate_user(email: str, password: str):
    user = await users_collection.find_one(
        {"email": email}
    )

    if not user:
        return None

    if not verify_password(
        password,
        user["password"]
    ):
        return None

    return user