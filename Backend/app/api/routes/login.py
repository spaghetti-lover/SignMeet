import os
from fastapi import APIRouter, Request, Response, status, HTTPException, Depends
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from app.dependencies import getSession, templatePath
from app.models.models import User
from app.models.schemas import UserSignUpModel
from sqlmodel import Session
from app.services.login_form import LoginForm
# Route dựa trên cả tên file và tên hàm

# TODO: Check login credentials from db (password still store in plain text)

router = APIRouter()
# session = Depends(getSession)
# template = Depends(templatePath)
# frontend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../../Frontend'))
# domain_template_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), "/templates")

@router.get('/', response_class=HTMLResponse)
async def login(request: Request, response: Response, template: Jinja2Templates = Depends(templatePath), session: Session = Depends(getSession)):
    # print(os.getcwd() + "\n" + frontend_path)
    # return template.TemplateResponse(request=request, name=os.path.join(frontend_path, "template/base.html"))
    return template.TemplateResponse("login.html", {'request': request})

@router.post('/', status_code=status.HTTP_200_OK)
async def loginSubmit(request: Request, response: Response, template: Jinja2Templates = Depends(templatePath), session: Session = Depends(getSession)):
    form = LoginForm(request)
    await form.load_data()
    if await form.is_valid():
        pass    