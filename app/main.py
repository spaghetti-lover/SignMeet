from contextlib import asynccontextmanager
from fastapi import FastAPI

from fastapi.routing import APIRoute
from fastapi.staticfiles import StaticFiles
from app.dependencies import create_db_and_tables
from app.api.main import api_router

def custom_generate_unique_id(route: APIRoute):
    return f"{route.tags[0]} - {route.name}"


# @app.get("/")
# async def root():
#     return {"message": "Testing"}
@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield

app = FastAPI(
    title="SignMeet Backend",
    lifespan=lifespan
)

app.mount("/static", StaticFiles(directory="../Frontend/static"), name="static")
app.include_router(api_router)