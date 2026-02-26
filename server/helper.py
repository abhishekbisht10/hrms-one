from database import employees_collection

def generate_employee_id():
    # Get last inserted employee based on employee_id
    last_emp = employees_collection.find_one(
        {},
        sort=[("employee_id", -1)]
    )
    # If no employees exist, start from 1
    if not last_emp:
        return "EMP0001"

    # Convert last ID to int
    last_number = int(last_emp["employee_id"][3:])
    # Increment
    new_number = last_number + 1
    return f"EMP{new_number:04d}"