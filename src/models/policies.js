const axios = require("./axios-response/axiosResponse");

class Policies{
    constructor(){
        this.policies= this.populateDatabase()
    }

    populateDatabase= async()=>{
        const policyList = await axios.get("http://www.mocky.io/v2/580891a4100000e8242b75c5")
        return policyList.clients
    }


    getPolicyByName(name){
        return this.policies.find(policy=> policy.name.toLowerCase()===name.toLowerCase())
    }

    getPolicyByEmail(email){
        return this.policies.find(policy=> policy.email.toLowerCase()===email.toLowerCase())
    }

    getPolicyById(id){
        return this.policies.find(policy=> policy.id.toLowerCase()===id.toLowerCase())
    }

}

module.exports = new Policies()