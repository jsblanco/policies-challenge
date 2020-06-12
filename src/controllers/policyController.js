"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Clients = require("../models/clientsDb");
const Policies = require("../models/policiesDb");
let appName = "App-";
appName += process.env.APPNAME;

//- Get the user linked to a policy number -> Can be accessed by users with role "admin"

exports.policiesByUsername = async (req, res) => {
  const name = req.body.name.trim();
  if (!name) return res.status(400).json({ msg: "Invalid query arguments" });
  try {
    switch (req.body.token.role) {
      case "admin":
        const client = await Clients.getByName(name);
        if (!client)
          return res.status(400).json({ msg: "No such user in database" });
        const policies = await Policies.getUserPolicies(client.id);
        !!policies
          ? res.status(200).json(policies)
          : res
              .status(400)
              .json({ msg: "This user has no policies to his name" });
        break;
      default:
        return res
          .status(401)
          .json({
            msg:
              "Your account does not have permission to access this information",
          });
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ msg: "Server error- please contact your administrator" });
  }
};

exports.getPolicyOwner = async (req, res) => {
  const policyId = req.body.id.trim();
  if (!policyId)
    return res.status(400).json({ msg: "Invalid query arguments" });
  try {
    switch (req.body.token.role) {
      case "admin":
        const policy = await Policies.getPolicy(policyId);
        if (!policy)
          return res
            .status(400)
            .json({
              msg: "No such policy in database, please check the provided ID",
            });
        const client = await Clients.getById(policy.clientId);
        !!client
          ? res.status(200).json(client)
          : res
              .status(400)
              .json({ msg: "Could not find the client linked to this policy" });
        break;
      default:
        return res
          .status(401)
          .json({
            msg:
              "Your account does not have permission to access this information",
          });
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ msg: "Server error- please contact your administrator" });
  }
};

// const policies = await Policies.getPolicyList()
// return res.status(200).json(policies)
