const jwt = require('jsonWebToken')
const SECRET = 'Leonardo'

/** 加密: 传入需要加密的内容 */
const setToken = (data: string) => {
  return jwt.sign({ data }, SECRET)
}

/** 解密: 传入已经加密的字符串 */
const getToken = (token: string) => {
  if (!token) return ''
  return jwt.verify(token, SECRET)
}

/** 从本地存储获取名字 */
const getNameFromLocal = () => {
  let name = ''
  const localData = localStorage.getItem('DiCaprio')
  if (localData) {
    const obj = getToken(localData)
    if (obj) {
      if (obj.data) {
        name = obj.data
      } else if (obj.userName) { // 兼容旧系统
        name = obj.userName
      }
    }
  }
  return name
}

/** 设置名字到本地存储里面 */
const setNameToLocal = (name: string) => {
  const localData = setToken(name)
  localStorage.setItem('DiCaprio', localData)
}

/** 名字检查 不能输入字母和数字 */
const checkEngAndNum = (str: string) => {
  const regx = /^[A-Za-z0-9]*$/
  if (regx.test(str)) {
    return true
  } else {
    return false
  }
}

const Util = {
  setToken,
  getToken,
  getNameFromLocal,
  setNameToLocal,
  checkEngAndNum
}

export default Util
