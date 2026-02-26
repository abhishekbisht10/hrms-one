import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardCharts from "../components/DashboardCharts";
import { getDashboardMetrics } from "../api";
import Loader from "../components/Loader";

function Dashboard() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const res = await getDashboardMetrics();
      setMetrics(res || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMetrics();
  }, []);

  if(loading) {
    return <Loader />
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-start gap-6 p-4">
      
      {/* Welcome */}
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome to HRMS One</h1>
        <p className="text-gray-600">
          A lightweight Human Resource Management System
        </p>
      </div>

      {/* Charts */}
      <div className="w-full">
        <DashboardCharts metrics={metrics} />
      </div>

      {/* Actions */}
      <div className="w-full">
        <h3 className="text-md font-semibold mb-3 flex items-center gap-1">
          <Users size={18} />
          Quick Actions
        </h3>

        {/* Card Deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Employee Card */}
          <div className="card">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">Add New Employee</h4>
              <p className="text-gray-500 text-sm mb-2">
                Add a new employee to your HR system with their details.
              </p>
              <button className="btn-primary" onClick={() => navigate("/employees/add")}>
                Add Employee
              </button>
            </div>
          </div>

          {/* Attendance Card */}
          <div className="card">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">Mark Attendance</h4>
              <p className="text-gray-500 text-sm mb-2">
                Record attendance for employees for today with a single click.
              </p>
              <button className="btn-primary" onClick={() => navigate("/attendance/manage")}>
                Manage Attendance
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Dashboard