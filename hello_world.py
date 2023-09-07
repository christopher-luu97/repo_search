from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# uvicorn hello_world:app --host 0.0.0.0 --port 8881 --reload

app= FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with the origin of your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Hello World!"}

@app.post("/api/endpoint")
async def create_item():
    return {"message": "POST REQUEST SUCCESS 200"}