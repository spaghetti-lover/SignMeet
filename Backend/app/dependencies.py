import os
from fastapi import Depends
from fastapi.templating import Jinja2Templates
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlmodel import SQLModel, Session

## Database Connection
sqlite_file_name = "databases.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}      # Use the same SQLite Database in different threads
engine = create_engine(sqlite_url, connect_args=connect_args, echo=True) #echo: generate SQL Code

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    print("Database created!")

#TODO: Can we refactor to include models.Base.metadata.create_all(bind = engine) from init_db.py ?
async def getSession():
    with Session(autocommit = False, autoflush = False, bind = engine) as session:
        try:
            yield session
        finally:
            session.close()
        
# TODO: Refactor this path to access more assets
def templatePath():
    # if (path is not None):
    #     return Jinja2Templates(directory="../Frontend/templates/" + str(path))
    return Jinja2Templates(directory="../Frontend/templates")