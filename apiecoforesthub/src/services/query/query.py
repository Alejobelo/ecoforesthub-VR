from itertools import groupby
from src.config.schemas.query import Query
from sqlalchemy.orm import joinedload
from src.config.schemas.user import User
from sqlalchemy import func
from src.config.schemas.comment import Comment


class QueryService():

    def __init__(self, db) -> None:
        self.db = db

    def get_queries(self):
        result = self.db.query(User.name, Query.description, Query.query, Query.created_at, Comment.content, User.name)\
        .join(Query, User.id == Query.user_id)\
        .outerjoin(Comment, Comment.comment_id == Query.user_id)\
        .filter(Query.id == id)\
        .order_by(Comment.created_at).all()
        result_format = [tuple(row) for row in result]

        columnas = ['nombre_usuario', 'descripcion_qery', 'content_query', 'created_date', 'commet_quey', 'name_comment']
        result_format = []
        for clave, grupo in groupby(result, lambda fila: fila[:4]):
        # Convierte los comentarios del grupo en una lista de diccionarios.
            comentarios = [{'comentario_contenido': comentario[4], 'nombre_comentador': comentario[5]} for comentario in grupo]

        # Forma un diccionario que incluye las primeras cuatro columnas y la lista de comentarios
            result_format = dict(zip(columnas, clave + (comentarios,)))

        # Agrega el resultado formateado a la lista final
            result_format.append(result_format)
            print('holaaaaaaaaaaaaa', result[0])
        return result_format