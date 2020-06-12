const axios = require("./axios-response/axiosResponse");

class Policies {
  constructor() {
    this.policies = [];
    this.populateDatabase();
  }

  populateDatabase = async () => {
    try {
      const policyJSON = await axios.get(
        "http://www.mocky.io/v2/580891a4100000e8242b75c5"
      );
      this.policies = this.policies.concat(policyJSON.policies);
    } catch (e) {
      console.log(e);
    }
  };

  getPolicyList() {
    return this.policies;
  }

  getUserPolicies(clientId) {
    return this.policies.filter((policy) => policy.clientId === clientId);
  }

  getPolicy(policyId) {
    return this.policies.find((policy) => policy.id === policyId);
  }
}

module.exports = new Policies();
