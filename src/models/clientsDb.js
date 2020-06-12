const axios = require("./axios-response/axiosResponse");

class Clients {
  constructor() {
    this.clients = [];
    this.populateDatabase();
  }

  populateDatabase = async () => {
    try {
      const clientJSON = await axios.get(
        "http://www.mocky.io/v2/5808862710000087232b75ac"
      );
      this.clients = this.clients.concat(clientJSON.clients);
      console.log("Client DB populated with mock JSON data");
    } catch (e) {
      console.log(e);
    }
  };

  getByName(name) {
    return this.clients.find(
      (client) => client.name.toLowerCase() === name.toLowerCase()
    );
  }

  getByEmail(email) {
    return this.clients.find((client) => client.email === email.toLowerCase());
  }

  getById(id) {
    return this.clients.find(
      (client) => client.id.toLowerCase() === id.toLowerCase()
    );
  }
}

module.exports = new Clients();
