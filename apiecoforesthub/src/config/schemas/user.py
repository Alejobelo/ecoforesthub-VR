from sqlalchemy import Column, Integer, String
from src.config import Base
from sqlalchemy.orm import relationship



class User(Base):
    __tablename__='users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50))
    email = Column(String(50))
    password = Column(String(255))

    
    comments = relationship('Comment', back_populates='user')

    queries = relationship('Query', back_populates='user')
