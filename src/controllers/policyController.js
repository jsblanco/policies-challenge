"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Clients = require("../models/clientsDb");
const Policies = require("../models/policiesDb");

exports.policiesByUsername = async (req, res) => {
  if (!req.body.name || !req.body.name.trim()) return res.status(400).json({ msg: "Invalid query arguments" });
  const name = req.body.name.trim();
  try {
    const client = await Clients.getByName(name);
    if (!client)
      return res.status(404).json({ msg: "No such user in database" });
    const policies = await Policies.getUserPolicies(client.id);
    !!policies
      ? res.status(200).json(policies)
      : res.status(404).json({ msg: "This user has no policies to his name" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Server error- please contact your administrator", error });
  }
};

exports.getPolicyOwner = async (req, res) => {
  if (!req.body.id || !req.body.id.trim()) return res.status(400).json({ msg: "Invalid query arguments" });
  const policyId = req.body.id.trim();
  try {
    const policy = await Policies.getPolicy(policyId);
    if (!policy)
      return res.status(404).json({
        msg: "No such policy in database, please check the provided ID",
      });
    const client = await Clients.getById(policy.clientId);
    !!client
      ? res.status(200).json(client)
      : res
          .status(404)
          .json({ msg: "Could not find the client linked to this policy" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Server error- please contact your administrator", error });
  }
};
