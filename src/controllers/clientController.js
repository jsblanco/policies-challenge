"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Clients = require("../models/clientsDb");
const Policies = require("../models/policiesDb");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const sendCookie = require("./../helpers/sendCookie");
let appName = "App-";
appName += process.env.APPNAME;



exports.me = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        
        switch (req.body.token.role){
            case "user": case "admin":
                break;
            default:
                res(401).json({msg: "This information is only available for "})

        }
      const user = await Clients.getByEmail(req.body.token.email)
      
    

    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json({ msg: "Server error- please contact your administrator" });
    }
  };