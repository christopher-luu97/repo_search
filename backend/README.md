# BACKEND

## Overview
This document provides instructions on building and configuring the backend of the application using Docker. Follow the steps below to set up the backend on your machine.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Building the Backend with Docker](#building-the-backend-with-docker)
- [Running the Application](#running-the-application)
- [Additional Configuration](#additional-configuration)

## Prerequisites
You will need to have an instance of Marqo up and running. Details on installing Marqo [here](https://docs.marqo.ai/1.3.0/)

Prior to indexing the documents, the Python environment must be set up from `vector_database/complete_dev_requirements.txt` and `vector_database/parse_python.py` must be ran to build the tree-sitter requirements to parse Python specific documents. You will also need Python tree sitter to parse the Python files.
```sh
git clone https://github.com/tree-sitter/tree-sitter-python
```

Once set up with the environment and vectore database engine, you can proceed to index the documents.

The desired documents (Python code files and functions) can then be indexed `vector_database/run_marqo.py` and follow the instructions on the command line interface to choose the location containing the code to be indexed. In my case, I have a folder called /repos that has /repos/marqo and /repos/fastapi which are the github repos downloaded respectively.

```sh
cd vector_database
python run_marqo.py
```
### Building the Backend with Docker

Execute the following command to build the Docker image for the frontend. The `-t` option tags the image as "backend," and `-f` specifies the Dockerfile to use for the build.

```sh
docker build -t backend -f backend.dockerfile .
```

### Running the application
```sh
docker run -d -p 8000:8000 backend
```

To mount the local directory containing your indexed repositories to the Docker container, use the command below. Modify the path "/Users/Documents/repos" to your actual directory path.

```sh
docker run -v "/Users/Documents/repos":/app/repos -p 8000:8000 backend
```

#### Additional Configuration
You will need to the modify `file_path_settings.json` and edit `MARQO_ENDPOINT` to where your Marqo instance is running (e.g. http://localhost:8882)
