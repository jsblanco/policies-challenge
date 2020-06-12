"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const db_config_1 = require("./config/db.config");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db_config_1.connectDB();
app.use(cookieparser());
app.use("/api/signup", require("./routes/signup"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/policies", require("./routes/policies"));
app.use("/api/clients", require("./routes/clients"));
module.exports = app;