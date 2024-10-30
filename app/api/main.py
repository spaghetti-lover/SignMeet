from fastapi import APIRouter

from app.api.routes import login, admin, register

api_router = APIRouter()


api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
api_router.include_router(login.router, prefix="/login", tags=["login"])
api_router.include_router(register.router, prefix="/register", tags=["register"])

