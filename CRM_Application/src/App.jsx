import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";
import LeaveApplication from "./pages/LeaveApplication";
import Card from "./components/Card";
import EmployeeAdd from "./components/admin/EmployeeAdd";
import EmployeeList from "./components/admin/EmployeeList";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Card/>} />
        {/* <Route path="/" element={<EmployeeDashboard />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Card />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/testing-path" element={<LeaveApplication />} />
        <Route path='/add-employee' element={<EmployeeAdd/>}/>
        <Route path='/employees' element={<EmployeeList/>}/>

      </Routes>
    </Router>
  );
}

export default App;
