// routes/index.js
const express = require("express");
const {  registerEmployeeController, loginEmployeeController, getAllEmployeeController, deleteEmployeeController, editEmployeeController, updateEmployeeController} = require("./controller/employeeController"); 
const { AttendanceController, GetAllAttendanceController, GetAttendanceSummaryController, GetMyAttendanceSummaryController} = require("./controller/puncinController"); 

const verifyToken = require("./middleware/JwtMiddleware");
const checkRole = require("./middleware/checkRole");

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

module.exports = router;
