const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  employeeId: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  doj: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
