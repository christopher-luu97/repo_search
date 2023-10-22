import json
from pathlib import Path


def load_settings() -> Path:
    with open("file_path_settings.json", "r") as file:
        settings = json.load(file)
        base_directory = settings.get("FILE_PATHS")
        marqo_endpoint = settings.get("MARQO_ENDPOINT")

    if base_directory:
        base_path = Path(base_directory)
        if not base_path.is_dir():
            print(
                f"Warning: The path {base_path} does not exist or is not a directory."
            )
        return base_path, marqo_endpoint
    else:
        print("Warning: File path not found in settings.")
        return None


BASE_PATH, MARQO_ENDPOINT = load_settings()
