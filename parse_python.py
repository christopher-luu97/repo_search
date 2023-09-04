from tree_sitter import Language, Parser

Language.build_library(
  # Store the library in the `build` directory
  'build/my-languages.so',

  # Include one or more languages
  [
    'tree-sitter-python',
    'tree-sitter-dockerfile',
    'tree-sitter-typescript',
    'tree-sitter-javascript',
    'tree-sitter-json',
    'tree-sitter-css',
    'tree-sitter-html'
  ]
)