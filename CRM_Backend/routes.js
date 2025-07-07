// routes/index.js
const express = require("express");
const {  registerEmployeeController, loginEmployeeController, getAllEmployeeController} = require("./controller/employeeController"); 

const router = new express.Router();

router.post("/register",registerEmployeeController);

router.post("/login",loginEmployeeController);

router.get('/employeelist', getAllEmployeeController);

module.exports = router;
