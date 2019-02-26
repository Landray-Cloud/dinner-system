const jwt = require('jsonWebToken')
const SECRET = 'Leonardo2.0'
const localName = 'USER_INFO_2_0'

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
  const localData = localStorage.getItem(localName)
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
  localStorage.setItem(localName, localData)
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

/** 部门对照表 */
const deptTable = [{
  value: 0,
  label: '用户体验部',
  adminName: '秋燕'
}, {
  value: 1,
  label: 'KM产品部',
  adminName: '新梅'
}, {
  value: 2,
  label: '蓝钉产品部',
  adminName: '娜娜'
}, {
  value: 3,
  label: '平台支持部',
  adminName: '娜娜'
}, {
  value: 4,
  label: 'EKP产品部',
  adminName: '娜娜'
}]

/** 传入数字 返回 部门的中文名字 */
function getDeptNameFromNum(dept: number) {
  const obj = deptTable[dept]
  return obj ? obj.label : ''
}

/** 传入数字 返回 部门的管理员名字 */
function getDeptAdminFromNum(dept: number | string) {
  const obj = deptTable[dept]
  return obj ? obj.adminName : ''
}

/** 返回状态的中文 */
function generateStatusName(status: number) {
  let text = ''
  let color = ''
  switch (status) {
    case 1:
      text = '加班订餐'
      color = 'blue'
      break
    case 2:
      text = '加班不订餐'
      color = 'yellow'
      break
    case 3:
      text = '不加班不订餐'
      color = 'red'
      break
  }
  return { text, color }
}
const Util = {
  setToken,
  getToken,
  getNameFromLocal,
  setNameToLocal,
  checkEngAndNum,
  getDeptNameFromNum,
  getDeptAdminFromNum,
  deptTable,
  generateStatusName
}

export default Util
