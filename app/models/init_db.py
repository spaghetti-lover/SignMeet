from databases import engine, Base
from models import User, Record

Base.metadata.create_all(bind=engine)