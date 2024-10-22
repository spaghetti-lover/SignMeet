from fastapi import APIRouter, status, HTTPException
from app.models.models import User
from app.models.schemas import UserSignUpModel
from app.models.databases import Session, engine

router = APIRouter()
session = Session(bind = engine)

@router.get('/')
async def login():
    return {"message": "Testingg"}

@router.post('/signup')
async def signup(user: UserSignUpModel):
    inputEmail = session.query(User).filter(User.email == user.email).first()
    if inputEmail is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already used!")
    
    inputUsername = session.query(User).filter(User.username == user.username).first()
    if inputUsername is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already used!")
    
    newUser = User(
        username = user.username,
        email = user.email,
        password = user.password,
        # is_active = user.is_active
    )
    
    session.add(newUser)
    session.commit()
    session.refresh(newUser)

    return newUser