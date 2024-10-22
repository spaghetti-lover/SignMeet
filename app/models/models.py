import uuid, json

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel
from sqlalchemy import Column, Integer, Boolean, Text, String, ARRAY, ForeignKey
from sqlalchemy.orm import relationship
from app.models.databases import *

MAX_USERNAME_LENGTH = 20
## STILL ERROR: Using this to walk around this issue (maybe): https://stackoverflow.com/questions/36943802/attributeerror-module-object-has-no-attribute-array

class User(Base):
    __tablename__ = 'User'
    id = Column(Integer, primary_key=True)
    username = Column(String(MAX_USERNAME_LENGTH), unique=True)
    email = Column(String, unique=True)
    password = Column(Text, nullable=False)
    # is_active = Column(Boolean, default=False)
    is_in_call = Column(Boolean, default=False) 
    # records = relationship("Record", back_populates='User')

    def __repr__(self):
        return f"User {self.username}"

# Dùng JSON để lưu dạng array 

class Record(Base):
    __tablename__ = "Record"
    id = Column(Integer, primary_key=True)
    # Thêm link với User nào tham gia cuộc trò chuyện này
    messages = Column(Text, default=[])
    user_ids = Column(Text, default=[])
    # users = relationship("User", back_populates="Record")

    def __repr__(self):
        return f"Record {self.user_ids}"
    
