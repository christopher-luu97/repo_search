# Adapted from: github.com/bebrws/openai-search-codebase-and-chat-abuot-it

import os
import glob
from tree_sitter import Language, Parser

PY_LANGUAGE = (Language('build/my-languages.so', 'python'), "*.py")

current_language = PY_LANGUAGE

def get_functions(filepath: str):
    """
    Get all the functions in a Python File

    Args:
        filepath (str): _description_
    """
    codestr = open(filepath).read().replace("\r", "\n")

    parser = Parser()
    parser.set_language(current_language[0])

    tree = parser.parse(bytes(codestr, "utf8"))
    cursor = tree.walk()
    cursor.goto_first_child()

    while True:
        print("type: ", cursor.node.type)
        print("bye locations: ", cursor.node.start_byte,
              " - ", cursor.node.end_byte)
        code = codestr[cursor.node.start_byte:cursor.node.end_byte]
        node_type = cursor.node.type
        print("code:\n", code)
        code_filename = {
            "code": code, "node_type": node_type, "filepath": filepath
        }
        if code.strip() != "":
            print("code_filename: ", code_filename)
            yield code_filename
        
        has_sibling = cursor.goto_next_sibling()
        if not has_sibling:
            break

code_root = input("Full path to code directory to search/embed/query: ")

code_files = [y for x in os.walk(code_root)
              for y in glob(os.path.join(x[0], current_language[1]))]

print("\nTotal number of files found: ", len(code_files))

all_nodes = []
for code_file in code_files:
    nodes = list(get_functions(code_file))

    for func in nodes:
        all_nodes.append(func)

node_count = len(all_nodes)
print("\nTotal number of functions extracted: ", node_count)