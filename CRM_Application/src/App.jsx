import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { Toaster } from "sonner";
import LeaveApplication from "./pages/LeaveApplication";
import Card from "./components/Card";
import EmployeeAdd from "./components/admin/EmployeeAdd";
import EmployeeList from "./components/admin/EmployeeList";
import Unauthorized from "./pages/Unauthorized";
import ProtectedAdminRoute from "./pages/ProtectedAdminRoute";
import PunchClock from "./components/punchin/PunchClock";
import Attendance from "./components/admin/Attendance";
import AttendanceSummary from "./components/AttendanceSummary";
import AdminLeaveManagement from "./components/admin/AdminLeaveManagement";
import UnderConstruction from "./components/cards/UnderConstruction";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/*  Admin-only routes */}
        <Route
          path="/register"
          element={
            <ProtectedAdminRoute>
              <Register />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/add-employee"
          element={
            <ProtectedAdminRoute>
              <EmployeeAdd />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedAdminRoute>
              <EmployeeList />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/Manage-Leave"
          element={
            <ProtectedAdminRoute>
              <AdminLeaveManagement />
            </ProtectedAdminRoute>
          }
        />

        {/* Normal routes */}
        <Route path="/dashboard" element={<Card />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/punchin" element={<PunchClock />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/my-attendance" element={<AttendanceSummary />} />
        <Route path="/apply-leave" element={<LeaveApplication />} />
        <Route path="/maintenance" element={<UnderConstruction/>} />


      </Routes>
    </Router>
  );
}

export default App;
