"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Clients = require("../models/clientsDb");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const sendCookie = require("./../helpers/sendCookie");
let appName = "App-";
appName += process.env.APPNAME;

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const email = req.body.email.toLowerCase();
  try {
    let userInDb = await Clients.getByEmail(email);
    if (!userInDb)
      return res.status(400).json({ msg: "Email is not valid" });
    sendCookie(res, userInDb);
  } catch (e) {
    res.status(400).send("An unspecified error ocurred");
  }
};

exports.me = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await Clients.getByEmail(req.body.token.email).select(
      "-password"
    );
    sendCookie(res, {
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ msg: "Server error- please contact your administrator" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie(process.env.APPNAME || "Web app");
    res.status(200).json({ msg: "Clients logged out sucesfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.edit = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  let { originalPassword } = req.body;
  const { id } = req.body.token;
  try {
    if (email !== req.body.token.email) {
      const checkEmail = await Clients.findOne({ email });
      if (checkEmail)
        return res
          .status(400)
          .json({ msg: `Email ${email} is already in use` });
    }
    if (!originalPassword) {
      originalPassword = password;
    }
    const userData = await Clients.findById(id);
    const checkPassword = await bcryptjs.compare(
      originalPassword,
      userData.password
    );
    if (!checkPassword)
      return res.status(400).json({ msg: "Incorrect password" });
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    await Clients.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
    sendCookie(res, { _id: id, name, email });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.body.token;
  try {
    const userData = await Clients.findById(id);
    if (!req.body.password)
      return res
        .status(400)
        .json({ msg: "Password is required but was not provided by user" });
    const checkPassword = await bcryptjs.compare(
      req.body.password,
      userData.password
    );
    if (!checkPassword)
      return res.status(400).json({ msg: "Password provided is incorrect" });
    await Clients.findByIdAndRemove(id);
    res.clearCookie(appName);
    res.json({ msg: `Deleted the specified user` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
};
