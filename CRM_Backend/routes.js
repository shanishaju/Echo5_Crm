// routes/index.js
const express = require("express");
const { registerEmployee } = require("./controller/employeeController"); 

const router = new express.Router();

router.post("/register", registerEmployee);

module.exports = router;
