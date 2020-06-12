const axios = require("./axios-response/axiosResponse");

class Policies{
    constructor(){
        this.policies= this.populateDatabase()
    }

    populateDatabase= async()=>{
        const policyList = await axios.get("http://www.mocky.io/v2/580891a4100000e8242b75c5")
        return policyList.policies
    }

    getPolicyList(){
        return this.policies
    }

}

module.exports = new Policies()