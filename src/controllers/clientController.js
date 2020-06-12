"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Clients = require("../models/clientsDb");
const Policies = require("../models/policiesDb");
const { validationResult } = require("express-validator");
let appName = "App-";
appName += process.env.APPNAME;

exports.getById = async (req, res) => {
  const { id } = req.body;
  console.log(req.body)
  try {
    switch (req.body.token.role) {
      case "user":
      case "admin":
        const client = await Clients.getById(id);
        !!client
        ? res.status(200).json(client)
        : res.status(400).json({msg: "No such user in database"});
        break;
      default:
        return res
          .status(401)
          .json({ msg: "This information is only available for " });
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ msg: "Server error- please contact your administrator" });
  }
};
