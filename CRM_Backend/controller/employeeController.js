const Employee = require("../models/employeeModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const attendanceModel = require("../models/attendanceModel");
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

//attendance controller

exports.AttendanceController = async (req, res) => {
  try {
    const { location, ipAddress } = req.body;
    const user = req.user;

    const existing = await attendanceModel.findOne({
      employeeId: user.employeeId,
      punchOut: { $exists: false },
    });

    const now = new Date();

    if (existing) {
      // Punch OUT
      existing.punchOut = now;
      await existing.save();
      return res.status(200).json({ message: "Punched Out", punchIn: existing.punchIn, punchOut: existing.punchOut });
    } else {
      // Punch IN
      const newPunch = new attendanceModel({
        employeeId: user.employeeId,
        ipAddress,
        location,
        punchIn: now,
      });
      await newPunch.save();
      return res.status(200).json({ message: "Punched In", punchIn: newPunch.punchIn });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to punch", error: err.message });
  }
};
