const attendanceModel = require("../models/attendanceModel");
const dayjs = require('dayjs');


// Haversine Distance Calculator
const isWithinAllowedDistance = (lat1, lon1, lat2, lon2, maxDistance = 300) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371000; // Earth's radius in meters
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a = Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance <= maxDistance;
};

//  authorized office static IPs 
// const ALLOWED_IPS = ["42.105.158.27"];
const ALLOWED_IPS = ["116.68.101.245"];   

exports.AttendanceController = async (req, res) => {
  try {
    const { ipAddress } = req.body;
    const user = req.user;
    const now = new Date();

    // Check IP access
    if (!ipAddress || !ALLOWED_IPS.includes(ipAddress)) {
      return res.status(403).json({
        message: "Access denied. You are not on an authorized office network.",
      });
    }

    // Check for existing punch-in without punch-out
    const existing = await attendanceModel.findOne({
      employeeId: user.employeeId,
      punchOut: null,
    });

    if (existing) {
      // === PUNCH OUT ===
      existing.punchOut = now;
      const workedMs = now - new Date(existing.punchIn);
      const hours = Math.floor(workedMs / (1000 * 60 * 60));
      const minutes = Math.floor((workedMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((workedMs % (1000 * 60)) / 1000);
      const workedTime = `${hours}h ${minutes}m ${seconds}s`;

      await existing.save();

      return res.status(200).json({
        message: "Punched Out",
        punchIn: existing.punchIn,
        punchOut: existing.punchOut,
        workedTime,
      });
    }

    // === PUNCH IN ===
    const newPunch = new attendanceModel({
      employeeId: user.employeeId,
      ipAddress,
      punchIn: now,
    });

    await newPunch.save();

    return res.status(200).json({
      message: "Punched In",
      punchIn: newPunch.punchIn,
    });
  } catch (err) {
    console.error("Punch Error:", err.message);
    res.status(500).json({ message: "Failed to punch", error: err.message });
  }
};

// full attendance summary
exports.GetAttendanceSummaryController = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const start = new Date(date + 'T00:00:00.000Z');
    const end = new Date(date + 'T23:59:59.999Z');

    const attendances = await attendanceModel
      .find({ punchIn: { $gte: start, $lte: end } })
      .populate("employeeId", "fullName") // Ensure employeeId is populated with fullName
      .sort({ punchIn: 1 });

    // Group by employee
    const grouped = {};
    for (const entry of attendances) {
      const id = entry.employeeId._id.toString(); // Ensure string ID
      if (!grouped[id]) {
        grouped[id] = {
          employeeId: id,
          employeeName: entry.employeeId.fullName,
          sessions: [],
          totalMs: 0,
        };
      }

      let worked = 0;
      if (entry.punchIn && entry.punchOut) {
        worked = new Date(entry.punchOut) - new Date(entry.punchIn);
        grouped[id].totalMs += worked;
      }

      grouped[id].sessions.push({
        punchIn: entry.punchIn,
        punchOut: entry.punchOut,
        workedMs: worked,
      });
    }

    const summary = Object.values(grouped).map((emp) => {
      const totalHours = Math.floor(emp.totalMs / (1000 * 60 * 60));
      const totalMinutes = Math.floor((emp.totalMs % (1000 * 60 * 60)) / (1000 * 60));
      const totalSeconds = Math.floor((emp.totalMs % (1000 * 60)) / 1000);

      return {
        employeeId: emp.employeeId,
        employeeName: emp.employeeName,
        sessions: emp.sessions,
        totalWorkedTime: `${totalHours}h ${totalMinutes}m ${totalSeconds}s`,
      };
    });

    res.status(200).json(summary);
  } catch (err) {
    console.error("Summary fetch error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//individual attendance summany
exports.GetMyAttendanceSummaryController = async (req, res) => {
  try {
    const employeeId = req.user.employeeId; // correct key
    const { date } = req.query;

    if (!date) return res.status(400).json({ message: "Date is required" });

    const start = new Date(`${date}T00:00:00.000Z`);
    const end = new Date(`${date}T23:59:59.999Z`);

    const attendance = await attendanceModel.findOne({
      employeeId,
      punchIn: { $gte: start, $lte: end },
    });

    if (!attendance) return res.status(404).json({ message: "No attendance record found" });

    const punchInTime = attendance.punchIn;
    const punchOutTime = attendance.punchOut;
    let totalDuration = "Not available";

    if (punchInTime && punchOutTime) {
      const durationMs = new Date(punchOutTime) - new Date(punchInTime);
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);
      totalDuration = `${hours}h ${minutes}m ${seconds}s`;
    }

    res.status(200).json({
      punchInTime,
      punchOutTime,
      totalDuration,
      location: attendance.location,
      ip: attendance.ipAddress,
    });
  } catch (error) {
    console.error("GetMyAttendanceSummaryController Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


