# Project Overview

# HRMS One
A lightweight Human Resource Management System to manage employees and attendance efficiently.

# Features
Dashboard: Visualizes attendance and employee metrics using charts.

Employee Management:
1. View all employees
2. Add new employee (email-based unique index to prevent duplicates)
3. Remove employee

Attendance Management:
1. Mark attendance (locked per day to prevent accidental edits; can be unlocked if necessary)
2. View individual attendance records: present days, absent days, attendance percentage

UI Features: Toast notifications for actions, charts for visualization.

# Tech stack used
Frontend: React, Tailwind CSS

Backend: FastAPI

Database: MongoDB

# Steps to run the project locally

Frontend:
1. Clone the repo
2. Navigate to client folder → npm install
3. Run locally → npm run dev

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


# Assumptions or limitations (if any)
Attendance: Locked per day to prevent changes; can be unlocked if needed.

Backend: Currently fetching the full employee list. Improvements:
1. Implement pagination to reduce latency and DB reads
2. Maintain a separate metrics collection updated on writes to speed up dashboard queries