from pydantic import BaseModel
from typing import Optional

class UserModel(BaseModel):
    name: Optional[str] = None
    email: str
    password: str