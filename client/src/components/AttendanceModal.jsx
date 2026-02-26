
function AttendanceModal({ open, onClose, employee, attendance }) {
  if (!open) return null;

  const total = attendance.length;
  const present = attendance.filter(a => a.status === "present").length;
  const absent = total - present;
  const percent = total ? ((present / total) * 100).toFixed(1) : 0;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg p-6 shadow-lg">

        {/* Header */}
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Employee Attendance</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <p><b>ID:</b> {employee.employee_id}</p>
          <p><b>Name:</b> {employee.full_name}</p>
          <p><b>Email:</b> {employee.email}</p>
          <p><b>Department:</b> {employee.department}</p>
        </div>

        {/* Metrics */}
        <div className="flex gap-4 mb-4 text-sm">
          <div className="flex-1 bg-green-100 px-3 py-2 rounded">Present: {present}</div>
          <div className="flex-1 bg-red-100 px-3 py-2 rounded">Absent: {absent}</div>
          <div className="flex-1 bg-blue-100 px-3 py-2 rounded">Attendance: {percent}%</div>
        </div>

        {/* Attendance List */}
        <div className="max-h-60 overflow-y-auto border border-slate-200 rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-2 text-left">Sno</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {attendance.map((a, i) => (
                <tr key={i}>
                  <td className="p-2 capitalize">{i+1}</td>
                  <td className="p-2">
                    {new Date(a.date).toLocaleDateString("en-IN")}
                  </td>
                  <td className="p-2 capitalize">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default AttendanceModal;