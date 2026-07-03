from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.mongodb import client

from app.routers.auth import router as auth_router
from app.routers.category import router as category_router
from app.routers.menu import router as menu_router
from app.routers.cart import router as cart_router
from app.routers.order import router as order_router
from app.routers.dashboard import router as dashboard_router
from app.routers.ai import router as ai_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await client.admin.command("ping")
        print("✅ MongoDB Connected Successfully")
    except Exception as e:
        print(f"❌ MongoDB Connection Failed: {e}")

    yield

    client.close()


app = FastAPI(
    title="FoodFlow AI API",
    description="AI Powered Food Ordering Platform",
    version="1.0.0",
    lifespan=lifespan,
)

# -------------------------
# CORS
# -------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Routers
# -------------------------

app.include_router(auth_router)
app.include_router(category_router)
app.include_router(menu_router)
app.include_router(cart_router)
app.include_router(order_router)
app.include_router(dashboard_router)
app.include_router(ai_router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to FoodFlow AI 🚀",
        "status": "Running Successfully",
    }


@app.get("/health")
async def health():
    return {
        "status": "Healthy",
    }