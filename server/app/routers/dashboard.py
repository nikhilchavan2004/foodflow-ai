from fastapi import APIRouter

from app.services.dashboard_service import dashboard_stats

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
async def stats():
    return await dashboard_stats()