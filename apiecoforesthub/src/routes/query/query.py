import os
from typing import List
from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from src.config.schemas.query import Query
from src.config.schemas.comment import Comment
from sqlalchemy import text
from src.config import Session
from src.models.query.query import QueryModel
from src.models.query.comment import CommentModel
from google.cloud import bigquery
from fastapi import Query as QueryS



query_router=APIRouter()

# , response_model=List[QueryModel], status_code=200, dependencies=[Depends(JWTBearer())])
@query_router.get('/queries', tags=['queries'])
def get_queries() -> List[dict]:
    db = Session()

     # Escribir la consulta SQL
    sql_query = text("""
        SELECT users.name, queries.query, queries.description, queries.created_at, comments.content
        FROM queries
        JOIN users ON queries.user_id = users.id
        LEFT JOIN comments ON comments.query_id = queries.id
    """)

     # Ejecutar la consulta
    result = db.execute(sql_query).fetchall()

     # Convertir los resultados a un formato que desees
    result_format = [
        {'name': row[0], 'query': row[1], 'description': row[2],
         'created_at': row[3], 'content': row[4]} for row in result
    ]

    return JSONResponse(status_code=200, content=jsonable_encoder(result_format))

@query_router.post('/queries', tags=['queries'])
def create_query(query: QueryModel):
    db = Session()
    new_query = Query(**query.model_dump())
    db.add(new_query)
    db.commit()
    return JSONResponse(status_code=201, content={"message": "Query saved correctly"})

@query_router.post('/queries/commet', tags=['queries'])
def create_query(query: CommentModel):
    db = Session()
    new_commet = Comment(**query.model_dump())
    db.add(new_commet)
    db.commit()
    return JSONResponse(status_code=201, content={"message": "Query saved correctly"})

@query_router.get("/queries/query")
def get_tree_count(
    start_year: int = QueryS(..., title="Start Year", description="Starting year", ge=2001, le=2022),
    end_year: int = QueryS(..., title="End Year", description="Ending year ", ge=2001, le=2022),
    state_name: str = QueryS(..., title="State Name", description="Name of the state"),
    status_code: str = QueryS(..., title="State Name", description="Status code tree")
):
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '../query/credentials.json'

    client = bigquery.Client()

    sql_query = f"""
    SELECT
      tree.tree_inventory_year,
      COUNT(*) AS tree_count
    FROM
      bigquery-public-data.usfs_fia.tree AS tree
    JOIN
      bigquery-public-data.usfs_fia.plot_tree AS plot_tree
    ON
      tree.tree_state_code = plot_tree.plot_state_code
    WHERE
      tree.tree_inventory_year BETWEEN {start_year} AND {end_year}
      AND plot_tree.plot_state_code_name = '{state_name}'
      AND tree.tree_status_code = {status_code}
    GROUP BY
      tree.tree_inventory_year;
    """

    try:
        query_job = client.query(sql_query)
        results = query_job.result()

        data = [{"tree_inventory_year": row.tree_inventory_year, "tree_count": row.tree_count} for row in results]

        return JSONResponse(content=data)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)