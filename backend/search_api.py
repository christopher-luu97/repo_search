from fastapi import FastAPI, HTTPException, Request, Depends, status
from fastapi.responses import JSONResponse
from vector_database.folderParser import FolderParser
from vector_database.vectorDatabase import VectorDatabase
from models.pydantic_models import Query
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path
from fastapi.responses import FileResponse
import os
import openai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Read the file path from the JSON file
with open("file_path_settings.json", "r") as file:
    settings = json.load(file)
    BASE_DIRECTORY = settings.get(
        "FILE_PATHS"
    )  # Retrieve the file path from the JSON content

# Verify if the path exists and is a directory
if BASE_DIRECTORY:
    BASE_PATH = Path(BASE_DIRECTORY)
    if not BASE_PATH.is_dir():
        print(f"Warning: The path {BASE_PATH} does not exist or is not a directory.")
else:
    print("Warning: File path not found in settings.")

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


# Act as a fileserver on local
@app.get("/repos/{file_path:path}")
async def read_file(file_path: str):
    if not BASE_DIRECTORY:
        raise HTTPException(status_code=500, detail="Base directory not configured.")

    file_location = BASE_PATH / file_path
    print(file_location)

    if file_location.is_file():
        return FileResponse(str(file_location))
    else:
        raise HTTPException(status_code=404, detail="File not found")


# OPENAPI stuff for gpt
# Read the file path from the JSON file
with open("oai_credentials.json", "r") as file:
    settings = json.load(file)
    OPENAI_API_KEY = settings.get("API_KEY")


@app.post("/ask")
async def ask_gpt3(question: str):
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI API Key not set")

    openai.api_key = OPENAI_API_KEY

    try:
        response = openai.Completion.create(
            engine="text-davinci-002", prompt=question, max_tokens=150
        )
        answer = response.choices[0].text.strip()
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
