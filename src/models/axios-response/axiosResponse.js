const axios = require("axios");

axios.interceptors.response.use(
  async (response) => {
    return await response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = axios;
