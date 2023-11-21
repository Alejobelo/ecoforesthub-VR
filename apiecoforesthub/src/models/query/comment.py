from datetime import datetime
from pydantic import BaseModel

class CommentModel(BaseModel):
    user_id: int
    query_id: int
    content: str
    created_at: datetime = None