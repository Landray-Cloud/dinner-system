const axios = require('axios')

const axiosInstance = axios.create({
  // baseURL: 'http://test.ywork.me/node/dinner/'
  baseURL: 'http://localhost:3001/node/dinner/'
})

module.exports = axiosInstance