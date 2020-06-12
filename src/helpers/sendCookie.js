"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signToken = require("./signToken");
require("dotenv").config();
let appName = "App-";
appName += process.env.APPNAME;


module.exports = (res, payloadInfo) => {
    res.cookie(appName, signToken(payloadInfo), {
        maxAge: process.env.COOKIEMAXAGE,
        httpOnly: true,
        secure: false
    }).json({msg: `Cookie sent for user ${payloadInfo.name}`});
};
