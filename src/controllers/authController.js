"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/user");
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
  const { password } = req.body;
  const email = req.body.email.toLowerCase();
  try {
    let userInDb = await User.findOne({ email });
    if (!userInDb)
      return res.status(400).json({ msg: "Email or password are not valid" });
    const checkPassword = bcryptjs.compareSync(password, userInDb.password);
    if (!checkPassword)
      return res.status(400).json({ msg: "Email or password are not valid" });
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
    const user = await User.findOne({ email: req.body.token.email }).select(
      "-password"
    );
    sendCookie(res, {
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ msg: "Server error- please contact your administrator" });
  }
};

exports.edit = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, password } = req.body;
  let { oldPassword } = req.body;
  const { id } = req.body.token;
  try {
    if (email !== req.body.token.email) {
      const checkEmail = await User.findOne({ email });
      if (checkEmail)
        return res.status(400).json({ msg: `Email ${email} is not valid` });
    }
    if (!oldPassword) oldPassword = password;
    const userData = await User.findById(id);
    const checkPassword = await bcryptjs.compare(
      oldPassword,
      userData.password
    );
    if (!checkPassword)
      return res.status(400).json({ msg: "Password incorrect" });
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    await User.findByIdAndUpdate(id, {
      username,
      email,
      password: hashPassword,
    });
    sendCookie(res, { _id: id, username, email });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.body.token;
  try {
    const userData = await User.findById(id);
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
    await User.findByIdAndRemove(id);
    res.clearCookie(appName);
    res.json({ msg: `Deleted the specified user` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Server error" });
  }
};


exports.logout = async (req, res) => {
    try {
      res.clearCookie(process.env.APPNAME || "Web app");
      res.status(200).json({ msg: "User logged out sucesfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  };
  