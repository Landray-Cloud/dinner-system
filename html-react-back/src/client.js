const axios = require('axios')

const axiosInstance = axios.create({
  baseURL: 'http://test.ywork.me/node/dinner/',
})

module.exports = axiosInstance