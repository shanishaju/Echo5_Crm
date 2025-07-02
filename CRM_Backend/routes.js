// routes/index.js
const express = require("express");
const {  registerEmployeeController, loginEmployeeController} = require("./controller/employeeController"); 

const router = new express.Router();

router.post("/register",registerEmployeeController);

router.post("/login",loginEmployeeController);

module.exports = router;
