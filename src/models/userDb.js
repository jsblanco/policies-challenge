"use strict";
const mongoose = require("mongoose");
const defaultConfig = {
    type: String,
    required: true,
    trim: true
};
const userSchema = mongoose.Schema({
    username: { ...defaultConfig, unique: true },
    email: { ...defaultConfig, unique: true },
    role: [{ ...defaultConfig, enum: ["user", "admin"] }],
    password: defaultConfig,
}, {
    timestamps: true
});
module.exports = mongoose.model("User", userSchema);
