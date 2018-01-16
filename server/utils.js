'use strict'
const FS = require('fs')
const connectionDatabase = require('./dao/connectionDatabase')
const $sql = require('./dao/sql')
const log4js = require('log4js')
const logger = log4js.getLogger()

// By default, log4js will not output any logs (so that it can safely be used in libraries). The level for the default category is set to OFF.
logger.level = 'debug'

Object.prototype.parseSqlResult = function() {
  return JSON.parse(JSON.stringify(this))
}


Date.prototype.Format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
}

// 统一错误处理
const _writeError = (echoMsg, logObj = echoMsg) => {
  logger.error(logObj)
  return { errcode: -1, errmsg: echoMsg }
}

// 统一成功处理
const _writeSuccess = (data = {}) => { return { errmsg: 'ok', errcode: 0, data } }


// 获取数据列表
async function getList(options) {
  let sqlExecute = $sql.queryListAll
  let sqlParam = null
  let name = options.name
  let orderDate = options.orderDate

  if (name && orderDate) { // 同时查询名字 和 日期
    sqlExecute = $sql.queryListByNameAndDate
    sqlParam = [name, orderDate]
  } else if (name) { // 查询名字
    sqlExecute = $sql.queryListByName
    sqlParam = name
  } else if (orderDate) { // 查询日期
    sqlExecute = $sql.queryListByDate
    sqlParam = orderDate
  }

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, sqlParam).then(succRes => {
      resolve(_writeSuccess(succRes))
    }).catch(errRes => {
      reject(_writeError('getList - 失败', errRes))
    })
  })
}

// 更新订餐数据
// orderStatus
// name
async function updateData(options) {
  let orderStatus = options.orderStatus
  let name = options.name

  let _Date = new Date()
  let orderDate = _Date.Format('yyyy-MM-dd')
  let orderTime = parseInt(_Date.getTime())
  let sqlExecute = $sql.insert
  let sqlParam = [orderStatus, orderDate, orderTime, name]

  // 只查今天
  let dbRes = await getList({ name, orderDate })
  return new Promise((resolve, reject) => {
    if (!dbRes) return reject(_writeError('getList - 集合返回失败'))
    let data = dbRes.data
    if (!data) return reject(_writeError('getList - 数据返回失败'))

    // 判断该人是否存在 ? 存在update : 否则insert
    if (data.length) {
      let isUpdate = false
      for (let item of data) {
        if (item.name === name) {
          isUpdate = true
          break
        }
      }
      if (isUpdate) sqlExecute = $sql.update
    }

    connectionDatabase(sqlExecute, sqlParam).then(succRes => {
      resolve(_writeSuccess())
    }).catch(errRes => {
      reject(_writeError('updateData - 失败', errRes))
    })
  })
}


// 某用户某天是否已做了选择
async function isAction(options) {
  let name = options.name
  let orderDate = options.orderDate

  if (!name || !orderDate) return _writeError('name和orderDate是必须参数')

  let dbRes = await getList(options)
  return new Promise((resolve, reject) => {
    if (!dbRes) return reject(_writeError('isAction - 集合返回失败'))
    let data = dbRes.data
    if (!data) return reject(_writeError('isAction - 数据返回失败'))
    if (!data.length) return resolve(_writeSuccess())

    let obj = { isAction: false }
    for (let item of data) {
      if (item.name === name) {
        obj.isAction = true
        break
      }
    }
    resolve(_writeSuccess(obj))
  })
}

// 某用户某天的点餐状态
// 1: 加班点餐
// 2: 加班不点餐
// 3: 不加班不点餐
async function orderStatus(options) {
  let name = options.name
  let orderDate = options.orderDate

  if (!name || !orderDate) return _writeError('name和orderDate是必须参数')

  let dbRes = await getList(options)
  return new Promise((resolve, reject) => {
    if (!dbRes) return reject(_writeError('orderStatus - 集合返回失败'))
    let data = dbRes.data
    if (!data) return reject(_writeError('orderStatus - 数据返回失败'))
    if (!data.length) return resolve(_writeSuccess())

    let obj = { orderStatus: 0 }
    for (let item of data) {
      if (item.name === name) {
        obj.orderStatus = item.orderStatus
        break
      }
    }
    resolve(_writeSuccess(obj))
  })
}

// 管理员登录
async function login(options) {
  let user = options.user
  let pass = options.pass

  if (!user || !user) return _writeError('user和pass是必须参数')

  let sqlExecute = $sql.login
  let sqlParam = [user, pass]

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, sqlParam).then(succRes => {
      // logger.debug(succRes)
      if (!succRes.length) return reject(_writeError('用户名或密码错误'))
      resolve(_writeSuccess({ isLogin: true }))
    }).catch(errRes => {
      reject(_writeError('login - 失败', errRes))
    })
  })
}


module.exports = {
  getList,
  updateData,
  isAction,
  orderStatus,
  login
}