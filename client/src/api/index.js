import apiClient from "../services";

// Get all employees
export const getEmployees = async () => {
  const res = await apiClient.get("/employees");
  return res.data;
};

// Add employee
export const addEmployee = async (payload) => {
  const res = await apiClient.post("/employees", payload);
  return res.data;
};

// Delete employee
export const removeEmployee = async (employee_id) => {
  const res = await apiClient.delete(`/employees/${employee_id}`);
  return res.data;
};

// Mark attendance
export const markAttendance = async (payload) => {
  const res = await apiClient.post("/attendance", payload);
  return res.data;
};

// Get employee attendance
export const getEmployeeAttendance = async (employee_id) => {
  const res = await apiClient.get(`/attendance/${employee_id}`);
  return res.data;
};

// Get dashboard metrics
export const getDashboardMetrics = async () => {
  const res = await apiClient.get("/metrics");
  return res.data;
};