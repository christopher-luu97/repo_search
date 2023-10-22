from vector_database.vectorDatabase import VectorDatabase
from config import MARQO_ENDPOINT

vector_database = VectorDatabase()
vector_database.start(endpoint=MARQO_ENDPOINT)
vector_database.get_index()
