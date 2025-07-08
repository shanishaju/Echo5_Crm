// routes/index.js
const express = require("express");
const {  registerEmployeeController, loginEmployeeController, getAllEmployeeController, AttendanceController} = require("./controller/employeeController"); 
const verifyToken = require("./middleware/JwtMiddleware");
const checkRole = require("./middleware/checkRole");

const router = new express.Router();

router.post("/register", verifyToken, checkRole("admin"),registerEmployeeController);

router.post("/login",loginEmployeeController);

router.get('/employeelist', getAllEmployeeController);

router.post("/attendance", verifyToken, AttendanceController);


module.exports = router;
