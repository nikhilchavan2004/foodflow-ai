from fastapi import APIRouter, HTTPException, status

from app.schemas.user_schema import UserRegister, UserLogin
from app.services.auth_service import (
    create_user,
    authenticate_user,
)
from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials

from app.auth.jwt_handler import security, verify_access_token
from app.auth.jwt_handler import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
async def register(user: UserRegister):

    created_user = await create_user(user)

    if created_user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered."
        )

    return {
        "message": "User registered successfully."
    }


@router.post("/login")
async def login(user: UserLogin):

    existing_user = await authenticate_user(
        user.email,
        user.password
    )

    if existing_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "user_id": str(existing_user["_id"]),
            "email": existing_user["email"],
            "role": existing_user["role"],
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.get("/me")
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    payload = verify_access_token(credentials.credentials)

    return {
        "message": "Authenticated User",
        "user": payload
    }