import marqo
import os
import json
from typing import Any, Dict, List, Optional, Union


class VectorDatabase:
    """
    Class to connect to marqo to provide results from queries back to the user
    """

    def start(self, endpoint: Optional[str] = "http://localhost:8882"):
        """
        Start the client

        Args:
            endpoint(str): URL endpoint for where Marqo is

        Example:
            start("http://localhost:8882")
        """
        self.client = marqo.Client(url=endpoint)

    def get_index(self, index_name: Optional[str] = "repo-index"):
        """_summary_

        Args:
            index_name (Optional[str], optional): Selected index name. Defaults to 'my-first-index'.
        """
        self.index_name = index_name

    @staticmethod
    def get_index_settings(filepath: Optional[str] = "index_settings.json") -> Dict:
        """
        Get the index settings for Marqo, defined in a separate JSON file

        Args:
            filepath (Optional[str], optional): File path to the index settings. Defaults to "./index_settings.json".

        Returns:
            Dict: _description_
        """
        # TODO fix hardcoded vector_database
        full_path = os.path.join(os.getcwd(), "vector_database", filepath)
        with open(full_path) as f:
            index_settings = json.load(f)
        return index_settings

    def delete_index(self, index_name: str):
        """
        Delete the index

        Args:
            index_name (str): index name to be deleted
        """
        mq = self.client
        mq.index(index_name).delete()

    def create_index(self, settings: Dict):
        """
        If the index does not exist, you can create it here

        Args:
            settings (Dict): Settings for the indexer
        """
        index_name = self.index_name
        mq = self.client
        try:
            mq.create_index(index_name, settings)
        except marqo.errors.MarqoWebError as e:
            if e.code == "index_already_exists":
                print(f"Index '{index_name}' already exists")
            else:
                print(f"MarqoWebError: {e}")

    def add_documents(self, documents: list, tensor_fields: list):
        """
        Add the documents and to marqo

        Args:
            documents (list): List of dictionaries
            tensor_fields: List of keys in the documents to index
        """
        index_name = self.index_name
        mq = self.client

        mq.index(index_name).add_documents(documents, tensor_fields=tensor_fields)

    def query(self, q: str) -> list:
        """
        Given an input query, return the search response from Marqo as a list of results

        Args:
            q (str): Input query

        Returns:
            results_list (list): List of hits from Marqo
        """
        index_name = self.index_name
        mq = self.client
        results = mq.index(index_name).search(q)
        results_list = []
        for item in results["hits"]:
            print(json.dumps(item, indent=4))
            results_list.append(item)
        return results_list
