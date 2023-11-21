from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from src.services.auth.crypt import check_password
from src.services.auth.jwt_manager import create_token
from src.services.auth.auth import AuthService
from src.config import Session
from src.config.schemas.user import User
from src.models.user.user import UserModel

auth_router = APIRouter()

@auth_router.post('/login', tags=['auth'])
def login(user: UserModel)-> dict:
    try:
        db = Session()

        result =db.query(User).filter(User.email == user.email).first()
        print('hhhhhhhhhhhhhhhhhh', result)
        if  result==None:
      
            raise HTTPException(status_code=404, detail="USER NO FIND")

        password_valid = check_password(user.password, result.password)

        if  password_valid:
            
            token = create_token({"user_id": user.email})

            return {"token": token}
        else:
            
            raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    except Exception as e:
        
        print(f"Error general: {e}")
        raise HTTPException(status_code=500, detail={e})

@auth_router.post('/register', tags=['auth'])
def register(user: UserModel)-> dict:
        db=Session()
        new_user=User(**user.model_dump())
        AuthService(db).register(new_user)
        return JSONResponse(status_code=201, content={"message": "User saved correctly"})
