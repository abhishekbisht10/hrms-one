from fastapi import APIRouter, HTTPException
from models import Attendance
import crud

router = APIRouter(prefix="/attendance", tags=["Attendance"])


# Mark attendance
@router.post("/", status_code=201)
def mark(att: Attendance):
    try:
        result = crud.mark_attendance(att)

        if not result:
            raise ValueError("Attendance already marked for today")

        return {
            "message": "Attendance marked successfully",
            "data": result
        }

    except ValueError as e:
        raise HTTPException(
            status_code=409,
            detail=str(e)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to mark attendance: {str(e)}"
        )


# Get employee attendance
@router.get("/{employee_id}", status_code=200)
def view(employee_id: str):
    try:
        records = crud.get_attendance(employee_id)

        if not records:
            raise ValueError("No attendance records found")

        return {
            "message": "Attendance fetched successfully",
            "data": records
        }

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch attendance: {str(e)}"
        )