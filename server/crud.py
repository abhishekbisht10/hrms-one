from datetime import datetime
from database import employees_collection, attendance_collection
from models import Employee, Attendance
from pymongo.errors import DuplicateKeyError
from helper import generate_employee_id


# Add new employee
def add_employee(emp: Employee):
    try:
        # generate employee id
        emp_id = generate_employee_id()

        employee_data = emp.model_dump()
        employee_data["employee_id"] = emp_id

        employees_collection.insert_one(employee_data)
        return emp_id

    except DuplicateKeyError:
        raise ValueError("Employee already exists")

    except Exception as e:
        raise Exception(f"Database error: {str(e)}")


# Get all employees
def get_employees():
    try:
        result = employees_collection.find({}, {"_id": 0})
        return list(result)
    except Exception as e:
        raise Exception(f"Failed to fetch employees: {str(e)}")


# Delete employee
def delete_employee(emp_id: str):
    try:
        result = employees_collection.delete_one({"employee_id": emp_id})
        if result.deleted_count == 0:
            raise ValueError("Employee not found")
        
        return True
    except ValueError:
        raise
    except Exception as e:
        raise Exception(f"Failed to delete employee: {str(e)}")


# Mark attendance
def mark_attendance(att: Attendance):
    try:
        # Server date only (start of day UTC)
        current_date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

        # Prevent duplicate attendance for same day
        existing = attendance_collection.find_one({
            "employee_id": att.employee_id,
            "date": current_date
        })

        if existing:
            raise ValueError("Attendance already marked for today")

        attendance_data = {
            "employee_id": att.employee_id,
            "date": current_date,
            "status": att.status
        }

        attendance_collection.insert_one(attendance_data)
        return {
            "employee_id": att.employee_id,
            "status": att.status
        }

    except ValueError:
        raise

    except Exception as e:
        raise Exception(f"Failed to mark attendance: {str(e)}")


# Get attendance
def get_attendance(emp_id: str):
    try:
        result = attendance_collection.find(
            {"employee_id": emp_id},
            {"_id": 0}
        )
        return list(result)
    except Exception as e:
        raise Exception(f"Failed to fetch attendance: {str(e)}")
    

# Get today's attendance
def get_todays_attendance():
    try:
        # Server date only (start of day UTC)
        current_date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)

        result = attendance_collection.find(
            {"date": current_date},
            {"_id": 0}
        )
        return list(result)
    except Exception as e:
        raise Exception(f"Failed to fetch attendance: {str(e)}")