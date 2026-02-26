from fastapi import APIRouter, HTTPException
from models import Employee
import crud

router = APIRouter(prefix="/employees", tags=["Employees"])


# Create new employee
@router.post("/", status_code=201)
def create_employee(emp: Employee):
    try:
        employee = crud.add_employee(emp)

        return {
            "message": "Employee created successfully",
            "data": employee
        }

    except ValueError as e:
        raise HTTPException(
            status_code=409,
            detail=str(e)
        )


# Get employees
@router.get("/", status_code=200)
def list_employees():
    try:
        employees = crud.get_employees()

        return {
            "message": "Employees fetched successfully" if employees else "No employees found",
            "data": employees
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch employees: {str(e)}"
        )


# Delete employee
@router.delete("/{employee_id}", status_code=200)
def remove_employee(employee_id: str):
    try:
        crud.delete_employee(employee_id)

        return {
            "message": "Employee deleted successfully"
        }

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )