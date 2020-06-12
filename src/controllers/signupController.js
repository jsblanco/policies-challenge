"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Clients = require("../models/clientsDb");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const sendCookie = require("./../helpers/sendCookie");


exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, password } = req.body;
  const email = req.body.email.toLowerCase();
  try {
    let user = await Clients.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: `Email ${email} is already in the database` });
    }
    user = await Clients.findOne({ name });
    if (user) {
      return res
        .status(400)
        .json({ msg: `Client name ${name} is already in the database` });
    }
    user = { name, email, password };
    user.password = bcryptjs.hashSync(password, 10);
    const createdClients = await Clients.collection.insertOne({
      ...user,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    sendCookie(res, createdClients.ops[0]);
  } catch (e) {
    res.status(400).send("An error ocurred");
  }
};
