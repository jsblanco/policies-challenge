const axios = require("./axios-response/axiosResponse");

class Clients{
    constructor(){
        this.clients= this.populateDatabase();
    }

    populateDatabase= async()=>{
        const clientList = await axios.get("http://www.mocky.io/v2/5808862710000087232b75ac")
        return clientList.clients
    }

    getClientByName(name){
        return this.clients.find(client=> client.name.toLowerCase()===name.toLowerCase())
    }

    getClientByEmail(email){
        return this.clients.find(client=> client.email.toLowerCase()===email.toLowerCase())
    }

    getClientById(id){
        return this.clients.find(client=> client.id.toLowerCase()===id.toLowerCase())
    }

}

module.exports = new Clients()