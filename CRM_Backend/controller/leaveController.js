// controller/leaveController.js
const LeaveRequest = require("../models/leaveModel");
const Employee = require("../models/employeeModel");
const Notification = require("../models/notificationModel");

exports.leaveApplicationController = async (req, res) => {
  try {
    const { startDate, endDate, reason, leaveType } = req.body;
    const employeeId = req.user.employeeId;

    const employeeExists = await Employee.findById(employeeId);
    if (!employeeExists) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const newLeave = new LeaveRequest({
      employee: employeeId,
      startDate,
      endDate,
      reason,
      leaveType,
    });

    await newLeave.save();

    //`notification for admin
    await Notification.create({
      type: "LeaveRequest",
      message: `${employeeExists.fullName} applied for leave from ${startDate} to ${endDate}.`,
      isRead: false,
    });

    res
      .status(201)
      .json({ message: "Leave applied successfully", leave: newLeave });
  } catch (error) {
    console.error("Leave apply error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllLeaveRequestsController = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find()
      .populate("employee", "fullName email department")
      .sort({ createdAt: -1 });

    res.status(200).json(leaves);
  } catch (error) {
    console.error("Error fetching leave requests:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateLeaveStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedLeave = await LeaveRequest.findByIdAndUpdate(
      id,
      { status, reviewedAt: new Date() },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.status(200).json({ message: "Leave status updated", leave: updatedLeave });
  } catch (error) {
    console.error("Error updating leave status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// EmployeeleaveController

exports.getEmployeeLeaveRequestsController = async (req, res) => {
  try {
    const employeeId = req.user.employeeId;

    const leaves = await LeaveRequest.find({ employee: employeeId })
      .sort({ createdAt: -1 });

    res.status(200).json(leaves);
  } catch (error) {
    console.error("Error fetching employee leaves:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

