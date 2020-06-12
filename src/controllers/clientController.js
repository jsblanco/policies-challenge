"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Clients = require("../models/clientsDb");
let appName = "App-";
appName += process.env.APPNAME;

exports.getById = async (req, res) => {
  const id = req.body.id.trim();
  if (!id) return res.status(400).json({msg: "Invalid query arguments"})
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
          .json({ msg: "Your account does not have permission to access this information"});
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ msg: "Server error- please contact your administrator" });
  }
};

exports.getByEmail = async (req, res) => {
  const email = req.body.email.trim();
  if (!email) return res.status(400).json({msg: "Invalid query arguments"})
  try {
    switch (req.body.token.role) {
      case "users":
      case "admin":
        const client = await Clients.getByEmail(email);
        !!client
        ? res.status(200).json(client)
        : res.status(400).json({msg: "No such user in database"});
        break;
      default:
        return res
          .status(401)
          .json({ msg: "Your account does not have permission to access this information"});
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ msg: "Server error- please contact your administrator" });
  }
};

exports.getByName = async (req, res) => {
  const name = req.body.name.trim();
  if (!name) return res.status(400).json({msg: "Invalid query arguments"})
  try {
    switch (req.body.token.role) {
      case "user":
      case "admin":
        const client = await Clients.getByName(name);
        !!client
        ? res.status(200).json(client)
        : res.status(400).json({msg: "No such user in database"});
        break;
      default:
        return res
          .status(401)
          .json({ msg: "Your account does not have permission to access this information"});
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ msg: "Server error- please contact your administrator" });
  }
};