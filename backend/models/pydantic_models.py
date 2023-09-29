from pydantic import BaseModel


# Creating a Pydantic model to handle request body
class Query(BaseModel):
    query: str
