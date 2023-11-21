from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from src.config import Base
from datetime import datetime

class Comment(Base):
    __tablename__ = 'comments'
    comment_id = Column(Integer, primary_key=True, autoincrement=True)
    query_id = Column(Integer, ForeignKey('queries.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    content = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship('User', back_populates='comments')


    