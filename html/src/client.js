import { notification } from 'antd'
const axios = require('axios')
const axiosInstance = axios.create({
  baseURL: 'http://test.ywork.me/node/dinner/',
  // baseURL: 'http://localhost:3001/node/dinner/',
  // timeout: 10000
})
// 添加响应拦截器
axiosInstance.interceptors.response.use((response) => {
  // 如果auth = 0 ，就跳转登陆
  if (response.data.auth === 0) {
    location.replace('#/login')
  }
  // 如果接口请求成功，但是返回errcode: -1，弹出errmsg
  if(response.data.errcode === -1) {
    notification.error({ message: `${response.data.errmsg}` })
  }
  return response;
  
}, (err) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        notification.error({ message: '请求参数错误' })
        break

      case 403:
        notification.error({ message: '拒绝访问' })
        break

      case 404:
        notification.error({ message: '请求失败' })
        break

      case 500:
        notification.error({ message: '服务器内部错误' })
        break

      case 504:
        notification.error({ message: '网络超时' })
        break

      default:
        notification.error({ message: `系统繁忙，错误码:${err.response.status}` })
    }
    if (err.response !== '') {
      console.log('error', error)
    }
  }
  return Promise.reject(err);
});
module.exports = axiosInstance