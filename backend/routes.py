from fastapi import HTTPException
from fastapi.responses import FileResponse
from models.pydantic_models import Query
from app import app
from vector_db import vector_database
from config import BASE_PATH
from fastapi import Request
from pydantic import BaseModel


class SearchQuery(BaseModel):
    query: str
    skip: int
    limit: int


@app.post("/search")
async def search_code(query: SearchQuery):
    response = vector_database.query(query.query, query.skip, query.limit)
    total_count = len(vector_database.query(query.query))

    return {"results": response, "total_count": total_count}


@app.get("/repos/{file_path:path}")
async def read_file(file_path: str):
    if not BASE_PATH:
        raise HTTPException(status_code=500, detail="Base directory not configured.")

    file_location = BASE_PATH / file_path
    if file_location.is_file():
        return FileResponse(str(file_location))
    else:
        raise HTTPException(status_code=404, detail="File not found")
