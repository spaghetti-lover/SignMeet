from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlmodel import SQLModel

connectArgs = {
    "check_same_thread": False          # Use the same SQLite Database in different threads
}

engine = create_engine('sqlite:///databases.db', connect_args=connectArgs, echo=True)     # echo mean generate SQL code

Base = declarative_base()
Session = sessionmaker()

# Base.metadata.create_all(bind=engine)
