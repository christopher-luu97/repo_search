from .folderParser import FolderParser
from .vectorDatabase import VectorDatabase

"""
This code is used to index incoming code to the database to be searched.
"""

if __name__ == "__main__":
    folder_path = input("Full path to folder containing code: ")

    parser = FolderParser(folder_path)
    file_nodes = parser.get_nodes()

    query = input("\nInput question to search: ")

    vector_database = VectorDatabase()
    vector_database.start()
    vector_database.get_index()

    tensor_fields = ["code"]
    vector_database.add_documents(file_nodes, tensor_fields)

    response = vector_database.query(query)
