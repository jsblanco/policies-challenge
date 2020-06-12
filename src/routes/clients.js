"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const clientController = require("./../controllers/clientController");
const auth = require("./../middleware/auth");
const checkError = require("./../helpers/checkUser");
router.post("/get-by-id", auth, clientController.getById);
router.post("/get-by-email", auth, clientController.getByEmail);
router.post("/get-by-name", auth, clientController.getByName);
module.exports = router;
