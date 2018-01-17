'use strict'
const connectionDatabase = require('../dao/connectionDatabase')
const $sql = require('../dao/Manager')
const log4js = require('log4js')
const Utils = require('../utils')
const logger = log4js.getLogger()
logger.level = 'debug'

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
      resolve(Utils.writeSuccess(succRes))
    }).catch(errRes => {
      reject(Utils.writeError('getList - 失败', errRes))
    })
  })
}


// 根据ID更新订餐数据 (管理用)
async function updateDataById(options) {
  let orderStatus = options.orderStatus
  let name = options.name
  let id = options.id
  let _Date = new Date()
  let orderDate = _Date.Format('yyyy-MM-dd')
  let orderTime = parseInt(_Date.getTime())
  let sqlExecute = $sql.updateById
  let sqlParam = [orderStatus, orderDate, orderTime, name, id]

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, sqlParam).then(succRes => {
      resolve(Utils.writeSuccess())
    }).catch(errRes => {
      reject(Utils.writeError('updateDataById - 失败', errRes))
    })
  })
}


// 删除某条订餐信息记录
async function deleteOrder(options) {
  let id = options.id
  let sqlExecute = $sql.deleteById

  if (!id) return Utils.writeError('deleteOrder: id是必须参数')

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, id).then(succRes => {
      resolve(Utils.writeSuccess())
    }).catch(errRes => {
      reject(Utils.writeError('deleteOrder - 失败', errRes))
    })
  })
}


// 管理员登录
async function login(options) {
  let user = options.user
  let pass = options.pass

  if (!user || !user) return Utils.writeError('login: user和pass是必须参数')

  let sqlExecute = $sql.login
  let sqlParam = [user, pass]

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, sqlParam).then(succRes => {
      if (!succRes.length) return reject(Utils.writeError('用户名或密码错误'))
      resolve(Utils.writeSuccess({ isLogin: true }))
    }).catch(errRes => {
      reject(Utils.writeError('login - 失败', errRes))
    })
  })
}


// 设置某日是否可以提交加班订餐记录
async function setSubmit(options) {
  let date = options.date
  let status = options.status

  if (!date || typeof status === 'undefined') return Utils.writeError('setSubmit: date和status是必须参数')

  // 这里为何直接是UPDATE而不是INSERT呢？
  // 因为下面调用getSubmit的时候，如果遇到没有数据，则可以先insert了
  let sqlExecute = $sql.setSubmitUpdate
  let sqlParam = [status, date]
  let getSub = await require('./Index').getSubmit({ date })

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, sqlParam).then(succRes => {
      resolve(Utils.writeSuccess())
    }).catch(errRes => {
      reject(Utils.writeError('setSubmit - 失败', errRes))
    })
  })
}

module.exports = {
  getList,
  updateDataById,
  deleteOrder,
  login,
  setSubmit
}