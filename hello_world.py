from fastapi import FastAPI

app= FastAPI()

@app.get("/")
async def read_root():
    return {"message": "Hello World!"}

@app.post("/")
async def create_item():
    return {"message": "POST REQUEST SUCCESS 200"}