const Employee = require("../models/employeeModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const Attendance = require("../models/attendanceModel");


// Register
exports.registerEmployeeController = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      employeeId,
      department,
      designation,
      doj,
      password,
      role = "employee", // default role
    } = req.body;

    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Employee already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employee({
      fullName,
      email,
      phone,
      employeeId,
      department,
      designation,
      doj,
      password: hashedPassword,
      role,
    });

    await newEmployee.save();
    res.status(200).json({ message: "Employee registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
exports.loginEmployeeController = async (req, res) => {
  try {
    const { email, password, workLocation, ipAddress } = req.body;

    // Define office IP addresses (you can modify these as needed)
    const OFFICE_IPS = [ "116.68.101.245"];

    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Validate office work location
    if (workLocation === "Office" && !OFFICE_IPS.includes(ipAddress)) {
      return res.status(403).json({ 
        message: "Office work location is only allowed from office network. Please select 'Hybrid' or connect from office network." 
      });
    }

    const token = jwt.sign(
      { 
        employeeId: employee._id, 
        role: employee.role,
        workLocation: workLocation,
        loginIP: ipAddress
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );  

    res.status(200).json({
      message: "Login successful",
      token,
      employee: {
        id: employee._id,
        fullName: employee.fullName,
        role: employee.role,
      },
      workLocation: workLocation,
      ipAddress: ipAddress
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Employees
exports.getAllEmployeeController = async (req, res) => {
  try {
    // Only fetch users with role "employee"
    const employees = await Employee.find({ role: "employee" }).sort({
      createdAt: -1,
    });
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch employee list", error: error.message });
  }
};

// Delete Employee
exports.deleteEmployeeController = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Employee.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Edit Employee 
exports.editEmployeeController = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Employee
exports.updateEmployeeController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updated = await Employee.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Change Password
exports.changePasswordController = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const employeeId = req.user.employeeId; // From JWT middleware

    // Validate required fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" });
    }

    // Basic password strength validation
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters long" });
    }

    // Find the employee
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, employee.password);
    if (!isCurrentPasswordValid) {
      console.log(`Failed password change attempt for employee ${employee.email} - incorrect current password`);
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Check if new password is different from current password
    const isSamePassword = await bcrypt.compare(newPassword, employee.password);
    if (isSamePassword) {
      return res.status(400).json({ message: "New password must be different from current password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    await Employee.findByIdAndUpdate(employeeId, { password: hashedNewPassword });

    // Log successful password change
    console.log(`Password successfully changed for employee ${employee.email} at ${new Date().toISOString()}`);

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


