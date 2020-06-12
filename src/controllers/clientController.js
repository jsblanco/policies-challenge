"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Clients = require("../models/clientsDb");

exports.getById = async (req, res) => {
  const id = req.body.id.trim();
  if (!id) return res.status(400).json({ msg: "Invalid query arguments" });
  try {
    const client = await Clients.getById(id);
    !!client
      ? res.status(200).json(client)
      : res.status(400).json({ msg: "No such user in database" });
  } catch (error) {
    res
      .status(401)
      .json({ msg: "Server error- please contact your administrator", error });
  }
};

exports.getByEmail = async (req, res) => {
  const email = req.body.email.trim();
  if (!email) return res.status(400).json({ msg: "Invalid query arguments" });
  try {
    const client = await Clients.getByEmail(email);
    !!client
      ? res.status(200).json(client)
      : res.status(400).json({ msg: "No such user in database" });
  } catch (error) {
    res
      .status(401)
      .json({ msg: "Server error- please contact your administrator", error });
  }
};

exports.getByName = async (req, res) => {
  const name = req.body.name.trim();
  if (!name) return res.status(400).json({ msg: "Invalid query arguments" });
  try {
    const client = await Clients.getByName(name);
    !!client
      ? res.status(200).json(client)
      : res.status(400).json({ msg: "No such user in database" });
  } catch (error) {
    res
      .status(401)
      .json({ msg: "Server error- please contact your administrator", error });
  }
};
