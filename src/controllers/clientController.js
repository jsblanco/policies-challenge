"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Clients = require("../models/clientsDb");

exports.getById = async (req, res) => {
  if (!req.body.id || !req.body.id.trim()) return res.status(400).json({ msg: "Invalid query arguments" });
  const id = req.body.id.trim();
  try {
    const client = await Clients.getById(id);
    !!client
      ? res.status(200).json(client)
      : res.status(404).json({ msg: "No such user in database" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Server error- please contact your administrator", error });
  }
};

exports.getByEmail = async (req, res) => {
  if (!req.body.email || !req.body.email.trim()) return res.status(400).json({ msg: "Invalid query arguments" });
  const email = req.body.email.trim();
  try {
    const client = await Clients.getByEmail(email);
    !!client
      ? res.status(200).json(client)
      : res.status(404).json({ msg: "No such user in database" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Server error- please contact your administrator", error });
  }
};

exports.getByName = async (req, res) => {
  if (!req.body.name || !req.body.name.trim()) return res.status(400).json({ msg: "Invalid query arguments" });
  const name = req.body.name.trim();
  try {
    const client = await Clients.getByName(name);
    !!client
      ? res.status(200).json(client)
      : res.status(404).json({ msg: "No such user in database" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Server error- please contact your administrator", error });
  }
};
