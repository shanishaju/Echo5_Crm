import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/EmployeeDashboard"; 
import AdminDashboard from "./pages/AdminDashboard"; 
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import LeaveApplication from "./pages/LeaveApplication";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/testing-path" element={<LeaveApplication/>}/>
      </Routes>
    </Router>
  );
}

export default App;
