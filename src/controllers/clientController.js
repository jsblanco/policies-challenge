"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Clients = require("../models/clients");
const Policies = require("../models/policies");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const sendCookie = require("./../helpers/sendCookie");
let appName = "App-";
appName += process.env.APPNAME;



exports.getPolicies = async(req, res)=>{
    const policies = await Policies.getPolicyList()
    return res.status(200).json(policies)
  }