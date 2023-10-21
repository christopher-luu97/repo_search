FROM python:3.10-slim
WORKDIR /backend
ENV DEBIAN_FRONTEND=noninteractive
ENV MODULE_NAME=search_api 
ADD backend_requirements.txt .
RUN pip install -r backend_requirements.txt \    
    && rm -rf /root/.cache 
COPY . .

CMD ["uvicorn", "search_api:app", "--host", "0.0.0.0", "--port", "8000"]
