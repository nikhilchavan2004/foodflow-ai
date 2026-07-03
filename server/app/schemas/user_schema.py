from pydantic import BaseModel, EmailStr, Field
from typing import Literal


class UserRegister(BaseModel):
    full_name: str = Field(min_length=3, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8)
    role: Literal["admin", "customer"] = "customer"


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: str
    full_name: str
    email: EmailStr
    role: str
    is_active: bool