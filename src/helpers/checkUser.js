"use strict";
const { check, checkSchema } = require("express-validator");
module.exports = () => {

    const Schema = {
        "role": {
          in: 'body',
          matches: {
            options: [/\b(?:admin|user)\b/],
            errorMessage: "Invalid role: only User and Admin roles allowed"
          }
        }
      }



    return [
        check("username", "username is required").not().isEmpty(),
        check("email", "Email not valid").isEmail(),
        check("password", "Password too short (min 8)").isLength({
            min: 8,
            max: 24,
        }),
        checkSchema(Schema)
    ];
};
