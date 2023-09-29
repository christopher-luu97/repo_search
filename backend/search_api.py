from fastapi import FastAPI, HTTPException, Request, Depends, status
from fastapi.responses import JSONResponse
from vector_database.folderParser import FolderParser
from vector_database.vectorDatabase import VectorDatabase
from models.pydantic_models import Query
import json

app = FastAPI()

# This will handle the vector database instantiation and indexing,
# so it only happens once when the server starts, not on every request
vector_database = VectorDatabase()
vector_database.start()
vector_database.get_index()


# uvicorn search_api:app --reload
@app.post("/search")
async def search_code(query: Query):
    # Get the response from vector_database
    response = vector_database.query(query.query)

    # Limit the number of items in the response if needed
    if len(response) > 20:
        response = response[:20]

    return {"results": response}
