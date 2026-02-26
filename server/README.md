# FastAPI Server

## Setup

1. Create virtual env (optional)
   python -m venv venv
   source venv/bin/activate  # mac/linux
   venv\Scripts\activate     # windows

2. Install dependencies
   pip3 install -r requirements.txt

## Run Server

python3 -m uvicorn main:app --reload

Server runs at:
http://127.0.0.1:8000

## API Docs

Swagger UI:
http://127.0.0.1:8000/docs

ReDoc:
http://127.0.0.1:8000/redoc

## Endpoints

POST   /employees
GET    /employees
DELETE /attendance/{employee_id}
POST   /attendance
GET    /attendance/{employee_id}