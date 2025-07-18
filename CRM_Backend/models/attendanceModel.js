const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  workLocation: {
    type: String,
    enum: ["Office", "Hybrid"],
    default: "Hybrid",
  },
  location: {
    latitude: Number,
    longitude: Number,
  },
  punchIn: {
    type: Date,
    default: Date.now,
  },
  punchOut: Date,
});

module.exports = mongoose.model("Attendance", attendanceSchema);
