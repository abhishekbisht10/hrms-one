import { ToastContainer } from "react-toastify"
import { BrowserRouter, Routes, Route } from "react-router-dom"
// Common Routes
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"
// Employee Routes
import EmployeeList from "./pages/EmployeeList"
import AddEmployee from "./pages/AddEmployee"
// Attendance Routes
import ViewAttendance from "./pages/ViewAttendance"
import ManageAttendance from "./pages/ManageAttendance"

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>

        <Route 
          path="/" 
          element={<Layout component={Dashboard} />}
        />

        <Route 
          path="/employees" 
          element={<Layout component={EmployeeList} />}
        />

        <Route 
          path="/employees/add" 
          element={<Layout component={AddEmployee} />}
        />

        <Route 
          path="/attendance" 
          element={<Layout component={ViewAttendance} />}
        />
        
        <Route 
          path="/attendance/manage" 
          element={<Layout component={ManageAttendance} />}
        />

        <Route 
          path="*" 
          element={<Layout component={NotFound} />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
