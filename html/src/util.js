const jwt = require('jsonWebToken')
const SECRET = 'Leonardo'

// 加密
const setToken = data => {
  return jwt.sign({ data }, SECRET)
}

// 解密
const getToken = token => {
  if (!token) return ''
  return jwt.verify(token, SECRET)
}

// 从本地存储获取名字
const getNameFromLocal = _ => {
  let name = ''
  const localData = localStorage.getItem('DiCaprio')
  if (localData) {
    const obj = getToken(localData)
    if (obj) {
      if (obj.data) {
        name = obj.data
      } else if (obj.userName) {
        name = obj.userName
      }
    }
  }
  return name
}

// 设置名字到本地存储里面
const setNameToLocal = name => {
  const localData = setToken(name)
  localStorage.setItem('DiCaprio', localData)
}

let Util = {
  setToken,
  getToken,
  getNameFromLocal,
  setNameToLocal
}
export default Util
