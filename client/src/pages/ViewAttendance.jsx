import { useState, useMemo, useEffect } from "react";
import { Users } from "lucide-react";
import { getEmployees, getEmployeeAttendance } from "../api";
import Loader from "../components/Loader";
import AttendanceModal from "../components/AttendanceModal";

function ViewAttendance() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;

  const [selectedEmp, setSelectedEmp] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Filtered employees
  const filtered = useMemo(
    () =>
      employees.filter(
        (emp) =>
          emp.full_name.toLowerCase().includes(search.toLowerCase()) ||
          emp.email.toLowerCase().includes(search.toLowerCase()) ||
          emp.department.toLowerCase().includes(search.toLowerCase()) ||
          emp.employee_id.toLowerCase().includes(search.toLowerCase())
      ),
    [search, employees]
  );

  // Pagination
  const pageCount = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await getEmployees();
      setEmployees(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const viewAttendance = async (emp) => {
    try {
      setLoading(true);
      const res = await getEmployeeAttendance(emp.employee_id);
      setSelectedEmp(emp);
      setAttendanceData(res || []);
      setModalOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if(loading) {
    return <Loader />
  }

  return (
    <div className="p-4 flex-1">
      <h3 className="text-md font-semibold mb-3 flex items-center gap-2">
        <Users size={18} />
        View Attendance
      </h3>
      
      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, email, department, ID"
        className="w-full text-sm mb-4 px-4 py-2 w-full rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3">Employee ID</th>
              <th className="px-6 py-3">Full Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Attendance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paginated.map((emp) => (
              <tr key={emp.employee_id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-3 font-medium text-gray-800">{emp.employee_id}</td>
                <td className="px-6 py-3">{emp.full_name}</td>
                <td className="px-6 py-3">{emp.email}</td>
                <td className="px-6 py-3">{emp.department}</td>
                <td className="px-6 py-2 text-center flex justify-center">
                  <button 
                    className="btn-primary"
                    onClick={() => viewAttendance(emp)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-gray-600 text-sm">
        <span>
          Page {currentPage} of {pageCount}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded hover:bg-blue-100 ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, pageCount))}
            disabled={currentPage === pageCount}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <AttendanceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        employee={selectedEmp}
        attendance={attendanceData}
      />
    </div>
  );
}

export default ViewAttendance;