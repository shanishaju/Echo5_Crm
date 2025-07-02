import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Register from "./pages/Register";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

  return (
    <Router>
      <Navbar onLogout={handleLogout} user={user} />
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Login />} />
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
