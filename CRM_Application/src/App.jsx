import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/EmployeeDashboard"; // ✅ Ensure this exists
import AdminDashboard from "./pages/AdminDashboard"; // ✅ Ensure this exists
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";

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
      </Routes>
    </Router>
  );
}

export default App;
