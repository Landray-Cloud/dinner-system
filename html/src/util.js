const jwt = require('jsonWebToken')
const SECRET = 'Fiona'

let Util = {
  // 加密
  setToken: data => {
    return jwt.sign({ data }, SECRET)
  },
  // 解密
  getToken: token => {
    if (!token) return ''
    return jwt.verify(token, SECRET)
  }
}
export default Util
