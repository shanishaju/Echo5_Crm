require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const router = require("./routes");
require("./connection");

const pfServer = express();
pfServer.use(cors());
pfServer.use(express.json());

pfServer.use("/uploads", express.static(path.join(__dirname, "uploads")));
pfServer.use("/", router);

const PORT = process.env.PORT || 4000;
pfServer.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
