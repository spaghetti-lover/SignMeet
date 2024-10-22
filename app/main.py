from fastapi import FastAPI
from fastapi.routing import APIRoute
from app.api.main import api_router

def custom_generate_unique_id(route: APIRoute):
    return f"{route.tags[0]} - {route.name}"

app = FastAPI(
    title="SignMeet Backend"
)

# @app.get("/")
# async def root():
#     return {"message": "Testing"}

app.include_router(api_router)