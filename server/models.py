from pydantic import BaseModel, EmailStr, field_validator

class Employee(BaseModel):
    full_name: str
    email: EmailStr
    department: str

    @field_validator("full_name", "department")
    def not_empty(cls, value):
        if not value.strip():
            raise ValueError("Field cannot be empty")
        return value

class Attendance(BaseModel):
    employee_id: str
    status: str  # "present" or "absent"

    @field_validator("employee_id", "status")
    def not_empty(cls, value):
        if not value.strip():
            raise ValueError("Field cannot be empty")
        return value