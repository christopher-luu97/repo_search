from fastapi import HTTPException, Request, Depends, status
from fastapi.responses import JSONResponse, FileResponse
from models.pydantic_models import Query
from app import app
from vector_db import vector_database
from config import BASE_PATH


@app.post("/search")
async def search_code(query: Query):
    response = vector_database.query(query.query)
    if len(response) > 20:
        response = response[:20]
    return {"results": response}


@app.get("/repos/{file_path:path}")
async def read_file(file_path: str):
    if not BASE_PATH:
        raise HTTPException(status_code=500, detail="Base directory not configured.")

    file_location = BASE_PATH / file_path
    if file_location.is_file():
        return FileResponse(str(file_location))
    else:
        raise HTTPException(status_code=404, detail="File not found")
