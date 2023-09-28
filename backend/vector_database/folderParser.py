# Adapted from: github.com/bebrws/openai-search-codebase-and-chat-abuot-it

import os
import glob
from tree_sitter import Language, Parser
from typing import Optional


class FolderParser:
    """
    Class to parse folders containing Python code only

    Yields:
        _type_: _description_
    """

    def __init__(self, root_file_path):
        self.current_language = self.get_language()  # Set default on init
        self.code_root = self.get_code_root(root_file_path)

    def get_code_root(self, root_file_path: str):
        """
        User inputs the folder path that contains code they want to parse
        """
        return root_file_path

    @staticmethod
    def get_language(
        build_folder: Optional[str] = "build/my-languages.so",
        language: Optional[str] = "python",
        file_extension: Optional[str] = "*.py",
    ):
        """
        Getter for the language builds, defaults all to Python specific

        Args:
            build_folder (Optional[str], optional): Folder for programming language build from tree-sitter. Defaults to 'build/my-languages.so'.
            language (Optional[str], optional): Programming language to parse. Defaults to 'python'.
            file_extension (Optional[str], optional): File extension of programming language files. Defaults to '*.py'.

        Returns:
            LANGUAGE (tuple): Tuple containing a tree_sitter.Language object and a string for file extension
        """
        build_folder = os.path.join(os.getcwd(), "vector_database", build_folder)
        LANGUAGE = (Language(build_folder, language), file_extension)
        return LANGUAGE

    def _get_functions(self, filepath: str):
        """
        Helper function to get all the functions in a file

        Args:
            filepath(str): Path to the code file
        """
        current_language = self.current_language
        codestr = open(filepath).read().replace("\r", "\n")

        parser = Parser()
        parser.set_language(current_language[0])

        tree = parser.parse(bytes(codestr, "utf8"))
        cursor = tree.walk()
        cursor.goto_first_child()

        while True:
            print("type: ", cursor.node.type)
            print(
                "bye locations: ", cursor.node.start_byte, " - ", cursor.node.end_byte
            )
            code = codestr[cursor.node.start_byte : cursor.node.end_byte]
            node_type = cursor.node.type
            print("code:\n", code)
            code_filename = {"code": code, "node_type": node_type, "filepath": filepath}
            if code.strip() != "":
                print("code_filename: ", code_filename)
                yield code_filename

            has_sibling = cursor.goto_next_sibling()
            if not has_sibling:
                break

    def _get_code_files(self) -> list:
        """
        Get all the code files to parse in an array

        Returns:
            code_files (list): List of files

        Example:
            For code_root == './search_app/transcription'
            then code files is:
            ['./search_app/transcription/download.py',
                './search_app/transcription/__init__.py',
                './search_app/transcription/transcribe.py',
                './search_app/transcription/main.py']
        """
        code_root = self.code_root
        current_language = self.current_language
        code_files = [
            y
            for x in os.walk(code_root)
            for y in glob.glob(os.path.join(x[0], current_language[1]))
        ]
        return code_files

    def get_nodes(self) -> list:
        """
        Loop through each file from get_code_files() and parse them to identify the contents

        Returns:
            all_nodes (list): Get all code, node_type and filepath for each line/functoin from code
        """
        code_files = self._get_code_files()

        all_nodes = []
        for code_file in code_files:
            nodes = list(self._get_functions(code_file))
            for func in nodes:
                all_nodes.append(func)
        all_nodes = self._process_nodes(all_nodes)
        print("Total number of functions extracted: ", len(all_nodes))
        return all_nodes

    def _process_nodes(self, all_nodes: list):
        """
        Processing function to replace new lines with spaces instead

        Returns:
            _type_: _description_
        """
        for item in all_nodes:
            item["code"] = item["code"].replace("\n", " ")
        return all_nodes
