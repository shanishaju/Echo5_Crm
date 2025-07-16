// routes/index.js
const express = require("express");
const {  registerEmployeeController, loginEmployeeController, getAllEmployeeController, deleteEmployeeController, editEmployeeController, updateEmployeeController} = require("./controller/employeeController"); 
const { AttendanceController, GetAttendanceSummaryController, GetMyAttendanceSummaryController} = require("./controller/puncinController"); 

const verifyToken = require("./middleware/JwtMiddleware");
const checkRole = require("./middleware/checkRole");
const { leaveApplicationController, getAllLeaveRequestsController, updateLeaveStatusController } = require("./controller/leaveController");
const { getNotifications } = require("./controller/notificationController");

const router = new express.Router();

router.post("/register", verifyToken, checkRole("admin"),registerEmployeeController);

router.post("/login",loginEmployeeController);

router.get('/employeelist', getAllEmployeeController);

router.post("/attendance", verifyToken, AttendanceController);

router.get('/all-attendance',GetAttendanceSummaryController  );

router.get('/my-attendance', verifyToken, GetMyAttendanceSummaryController);

router.delete('/delete-employee/:id', deleteEmployeeController);

router.get('/edit-employee/:id', editEmployeeController);

router.put('/update-employee/:id', updateEmployeeController);

router.post("/leave-applications", verifyToken, leaveApplicationController);

router.get("/admin/leave-requests", verifyToken, checkRole("admin"),getAllLeaveRequestsController );
router.patch("/admin/leave-requests/:id", verifyToken, checkRole("admin"),updateLeaveStatusController );
router.get("/notifications", getNotifications);

module.exports = router;