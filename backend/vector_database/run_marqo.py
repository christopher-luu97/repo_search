from folderParser import FolderParser
from vectorDatabase import VectorDatabase

"""
This code is used to index incoming code to the database to be searched.
"""

if __name__ == "__main__":
    folder_path = input("Full path to folder containing code: ")

    parser = FolderParser(folder_path)
    file_nodes = parser.get_nodes()

    vector_database = VectorDatabase()
    vector_database.start()
    vector_database.get_index()
    index_settings = vector_database.get_index_settings()
    created_or_exists = vector_database.create_index(index_settings)
    if created_or_exists:
        tensor_fields = ["code"]
        vector_database.add_documents(file_nodes, tensor_fields)
