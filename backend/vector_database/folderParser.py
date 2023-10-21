# Adapted from: github.com/bebrws/openai-search-codebase-and-chat-abuot-it

import os
import glob
from tree_sitter import Language, Parser
from typing import Optional, List, Dict, Tuple, Generator, Union


class FolderParser:
    """
    Class to parse folders containing Python code only
    """

    def __init__(self, root_file_path):
        self.current_language: Tuple[Language, str] = self.get_language()
        self.code_root: str = self.get_code_root(root_file_path)

    def get_code_root(self, root_file_path: str) -> str:
        """
        User inputs the folder path that contains code they want to parse

        Args:
            root_file_path (str): Complete file path to the folder to parse
        """
        return root_file_path

    @staticmethod
    def get_language(
        build_folder: Optional[str] = "build/my-languages.so",
        language: Optional[str] = "python",
        file_extension: Optional[str] = "*.py",
    ) -> Tuple[Language, str]:
        """
        Getter for the language builds, defaults all to Python specific

        Args:
            build_folder (Optional[str], optional): Folder for programming language build from tree-sitter. Defaults to 'build/my-languages.so'.
            language (Optional[str], optional): Programming language to parse. Defaults to 'python'.
            file_extension (Optional[str], optional): File extension of programming language files. Defaults to '*.py'.

        Returns:
            LANGUAGE (tuple): Tuple containing a tree_sitter.Language object and a string for file extension
        """
        build_folder = os.path.join(os.getcwd(), build_folder)
        LANGUAGE: Tuple[Language, str] = (
            Language(build_folder, language),
            file_extension,
        )
        return LANGUAGE

    def _get_functions(self, filepath: str) -> Generator[Dict[str, str], None, None]:
        """
        Helper function to get all the functions in a file

        Args:
            filepath(str): Path to the code file

        Returns:
            Generator[Dict[str,str], None, None]: Dictionary identifiying code, type and path
        """
        current_language: Tuple[Language, str] = self.current_language
        codestr: str = open(filepath).read().replace("\r", "\n")

        parser: Parser = Parser()
        parser.set_language(current_language[0])

        tree = parser.parse(bytes(codestr, "utf8"))
        cursor = tree.walk()
        cursor.goto_first_child()

        while True:
            code: str = codestr[cursor.node.start_byte : cursor.node.end_byte]
            node_type: str = cursor.node.type
            code_filename: Dict[str, str] = {
                "code": code,
                "node_type": node_type,
                "filepath": filepath,
            }
            if code.strip() != "":
                yield code_filename

            has_sibling = cursor.goto_next_sibling()
            if not has_sibling:
                break

    def _get_code_files(self) -> List[str]:
        """
        Get all the code files to parse in an array

        Returns:
            code_files (List[str]): List of files

        Example:
            For code_root == './search_app/transcription'
            then code files is:
            ['./search_app/transcription/download.py',
                './search_app/transcription/__init__.py',
                './search_app/transcription/transcribe.py',
                './search_app/transcription/main.py']
        """
        code_root: str = self.code_root
        current_language: Tuple[Language, str] = self.current_language
        code_files: List[str] = [
            y
            for x in os.walk(code_root)
            for y in glob.glob(os.path.join(x[0], current_language[1]))
        ]
        return code_files

    def get_nodes(self) -> List[Dict[str, str]]:
        """
        Loop through each file from get_code_files() and parse them to identify the contents

        Returns:
            all_nodes (List[Dict[str,str]]): Get all code, node_type and filepath for each line/functoin from code
        """
        code_files: List[str] = self._get_code_files()

        all_nodes: List[Dict[str, str]] = []
        for code_file in code_files:
            nodes: List[Dict[str, str]] = list(self._get_functions(code_file))
            for func in nodes:
                all_nodes.append(func)
        all_nodes = self._process_nodes(all_nodes)
        print("Total number of functions extracted: ", len(all_nodes))

        filtered_data: List[Dict[str, str]] = [
            item
            for item in all_nodes
            if item["node_type"] not in ["import_statement", "import_from_statement"]
        ]
        return filtered_data

    def _process_nodes(self, all_nodes: List[Dict[str, str]]) -> List[Dict[str, str]]:
        """
        Processing function to replace new lines with spaces instead

        Args:
            all_nodes (List[Dict[str,str]]): List of dictionaries containing code, node type and path

        Returns:
            all_nodes (List[Dict[str,str]]): Processed input where newlines have been replaced
        """
        for item in all_nodes:
            item["code"] = item["code"].replace("\n", " ")
        return all_nodes
