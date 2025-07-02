const Employee = require("../models/employeeModel");

// Register Employee
exports.registerEmployee = async (req, res) => {
  try {
    const { fullName, email, phone, employeeId, department, designation, doj, password } = req.body;

    // Check existing user
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
      password, // In real-world apps, hash password
    });

    await newEmployee.save();
    res.status(200).json({ message: "Employee registered successfully!" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
