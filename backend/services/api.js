var axios = require("axios");

const Api = axios.create({
    baseURL: 'http://helpackage-com.umbler.net/'
});

module.exports = Api;