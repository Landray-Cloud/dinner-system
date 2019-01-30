'use strict'
const connectionDatabase = require('../dao/connectionDatabase')
const $sql = require('../dao/Index')
const Utils = require('../utils')
const log4js = require('log4js')
const logger = log4js.getLogger()
logger.level = 'debug'

// 插入数据
async function addOrder(options) {
  const name = options.name
  const department = options.department
  const orderStatus = options.orderStatus

  // if (!name || !department || !orderStatus) {
  // 开发期间，先把department参数弄成非必填
  if (!name || !orderStatus) {
    Utils.writeError('addOrder: name、department、orderStatus是必须参数')
    return
  }

  const restaurant = options.restaurant || ''
  const remarks = options.remarks || ''
  const _Date = new Date()
  const orderDate = _Date.Format('yyyy-MM-dd')
  const orderTime = parseInt(_Date.getTime())
  const sqlExecute = $sql.insertOrder
  const sqlParam = [name, orderStatus, orderDate, orderTime, remarks, department, restaurant]

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, sqlParam).then(succRes => {
      resolve(Utils.writeSuccess())
    }).catch(errRes => {
      reject(Utils.writeError('addOrder - 失败', errRes))
    })
  })
}


// 某用户某天是否已做了选择
async function isAction(options) {
  const name = options.name
  const orderDate = options.orderDate

  if (!name || !orderDate) return Utils.writeError('isAction: name和orderDate是必须参数')

  const sqlExecute = $sql.queryAction
  const sqlParam = [name, orderDate]

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, sqlParam).then(succRes => {
      let obj = { isAction: false }
      if (succRes.length && succRes.length > 0) obj.isAction = true
      resolve(Utils.writeSuccess(obj))
    }).catch(errRes => {
      reject(Utils.writeError('isAction - 失败', errRes))
    })
  })
}


// 某用户某天的点餐状态
// 0: 未选
// 1: 加班点餐
// 2: 加班不点餐
// 3: 不加班不点餐
async function orderStatus(options) {
  const name = options.name
  const orderDate = options.orderDate

  if (!name || !orderDate) return Utils.writeError('orderStatus: name和orderDate是必须参数')

  const sqlExecute = $sql.queryOrderStatus
  const sqlParam = [name, orderDate]

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, sqlParam).then(succRes => {
      let obj = { orderStatus: 0 }

      if (!succRes.length || succRes.length === 0) return resolve(Utils.writeSuccess(obj))

      obj.orderStatus = succRes[0].orderStatus

      resolve(Utils.writeSuccess(obj))
    }).catch(errRes => {
      reject(Utils.writeError('orderStatus - 失败', errRes))
    })
  })
}


// 获取某日是否可以提交加班订餐记录
// status:1 == 开
// status:0 == 关
async function getSubmit(options) {
  const date = options.date

  if (!date) return Utils.writeError('getSubmit: date是必须参数')

  const sqlExecute = $sql.getSubmit
  const sqlParam = [date]

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, sqlParam).then(succRes => {
      let status = 1
      // 没有数据，则帮他插入一条status为1的
      if (!succRes.length || succRes.length === 0) {
        connectionDatabase($sql.setSubmitInsert, [status, date])
      } else {
        status = succRes[0].status
      }
      resolve(Utils.writeSuccess({ status }))
    }).catch(errRes => {
      reject(Utils.writeError('getSubmit - 失败', errRes))
    })
  })
}

module.exports = {
  addOrder,
  isAction,
  orderStatus,
  getSubmit
}