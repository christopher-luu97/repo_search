from django.core.management.utils import get_random_secret_key
import json

def create_key():
    secret_key = get_random_secret_key()

    secret_key_json = {
    "SECRET_KEY": secret_key
    }

    with open('env.json', 'w') as env_file:
        json.dump(secret_key_json, env_file, indent=2)