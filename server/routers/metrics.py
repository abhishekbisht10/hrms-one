from fastapi import APIRouter, HTTPException
from collections import Counter
import crud

router = APIRouter(prefix="/metrics", tags=["Metrics"])


# Get metrics
@router.get("/", status_code=200)
def metrics():
    try:
        employee_metrics = crud.get_employees()
        attendance_metrics = crud.get_todays_attendance()

        present = sum(1 for a in attendance_metrics if a["status"] == "present")
        absent = sum(1 for a in attendance_metrics if a["status"] == "absent")

        department_counts = [
            {"department": dept, "count": count}
            for dept, count in Counter(emp["department"] for emp in employee_metrics).items()
        ]

        return {
            "message": "Metrics fetched successfully" if attendance_metrics else "No metrics found",
            "data": {
                "present_today": present,
                "absent_today": absent,
                "department_count": department_counts
            }
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch metrics: {str(e)}"
        )
