from vector_database.vectorDatabase import VectorDatabase

vector_database = VectorDatabase()
vector_database.start(endpoint="http://192.168.8.188:8882")
vector_database.get_index()
