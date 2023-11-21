from src.services.auth.crypt import hash_password
from src.config.schemas.user import User
from src.models.user.user import UserModel


class AuthService():

    def __init__(self, db) -> None:
        self.db = db

    def register(self, user: UserModel):
        user.password = hash_password(user.password)
        self.db.add(user)
        self.db.commit()
        return
