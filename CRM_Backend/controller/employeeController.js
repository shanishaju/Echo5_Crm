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
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { employeeId: employee._id, role: employee.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      employee: {
        id: employee._id,
        fullName: employee.fullName,
        role: employee.role,
      },
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

