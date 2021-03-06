"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const clientController = require("./../controllers/clientController");
const auth = require("./../middleware/auth");
const permissions = require("./../middleware/permissions");
router.post("/get-by-id", auth, permissions.usersAndAdmin, clientController.getById);
router.post("/get-by-email", auth, permissions.usersAndAdmin, clientController.getByEmail);
router.post("/get-by-name", auth, permissions.usersAndAdmin, clientController.getByName);
module.exports = router;
