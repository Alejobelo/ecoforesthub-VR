from jwt import encode
from fastapi import HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from starlette.requests import Request 

def create_token(data: dict):
    token: str = encode(payload=data, key='secret', algorithm="HS256")
    return token

class JWTBearer(HTTPBearer):
    async def __call__(self, request: Request):
        token_result = await super().__call__(request)
        data = validate_token(token_result.credentials)
        if data['email'] != "admin@gmail.com":
            raise HTTPException(status_code=403, detail='wrong credentials')

def validate_token(token: str)-> dict:
    data: dict = encode(token, key='secret', algorithms=['HS256'])
    return data

