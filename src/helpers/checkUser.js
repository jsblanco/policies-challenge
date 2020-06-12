"use strict";
const { check, checkSchema } = require("express-validator");
module.exports = () => {
  const Schema = {
    role: {
      in: "body",
      matches: {
        options: [/\b(?:admin|users)\b/],
        errorMessage: 'Invalid role: only "users" and "admin" roles allowed',
      },
    },
  };

  return [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be betwen 8 and 24 characters long)").isLength({
      min: 8,
      max: 24,
    }),
    checkSchema(Schema),
  ];
};
