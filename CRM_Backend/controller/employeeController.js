const Employee = require("../models/employeeModel");
const jwt = require("jsonwebtoken");

// Register Employee
exports.registerEmployeeController = async (req, res) => {
  try {
    const { fullName, email, phone, employeeId, department, designation, doj, password } = req.body;

    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Employee already exists!" });
    }

    const newEmployee = new Employee({
      fullName,
      email,
      phone,
      employeeId,
      department,
      designation,
      doj,
      password,
    });

    await newEmployee.save();
    res.status(200).json({ message: "Employee registered successfully!" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login Employee
exports.loginEmployeeController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { employeeId: employee._id, role: "employee" },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      employee: {
        id: employee._id,
        fullName: employee.fullName,
        email: employee.email,
        department: employee.department,
        role: "employee",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
