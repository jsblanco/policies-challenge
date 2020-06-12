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
      console.log("Policies DB populated with mock JSON data");
    } catch (e) {
      console.log(e);
    }
  };

  getPolicyList() {
    return this.policies;
  }
}

module.exports = new Policies();
