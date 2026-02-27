## FastAPI Server

Backend (Mac):
1. Clone the repo
2. Navigate to server folder → pip3 install -r requirements.txt
3. Run server → python3 -m uvicorn main:app --reload

Swagger UI: http://127.0.0.1:8000/docs

## API Endpoints

| Method | Endpoint                  | Description                    |
| ------ | ------------------------- | ------------------------------ |
| POST   | /employees                | Add a new employee             |
| GET    | /employees                | Get all employees              |
| DELETE | /employees/{employee_id}  | Delete employee                |
| POST   | /attendance               | Mark attendance                |
| GET    | /attendance/{employee_id} | View attendance of an employee |
| GET    | /metrics                  | Get dashboard metrics          |

## Note 
Keeping .env in public repo to allow viewers to experience the platform end to end