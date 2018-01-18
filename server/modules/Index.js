'use strict'
const connectionDatabase = require('../dao/connectionDatabase')
const $sql = require('../dao/Index')
const Utils = require('../utils')
const log4js = require('log4js')
const logger = log4js.getLogger()
logger.level = 'debug'


// 更新订餐数据 (弃用)
// orderStatus
// name
// async function updateData(options) {
//   let orderStatus = options.orderStatus
//   let name = options.name

//   let _Date = new Date()
//   let orderDate = _Date.Format('yyyy-MM-dd')
//   let orderTime = parseInt(_Date.getTime())
//   let sqlExecute = $sql.insert
//   let sqlParam = [orderStatus, orderDate, orderTime, name]

//   // 只查今天
//   let dbRes = await getList({ name, orderDate })
//   return new Promise((resolve, reject) => {
//     if (!dbRes) return reject(Utils.writeError('getList - 集合返回失败'))
//     let data = dbRes.data
//     if (!data) return reject(Utils.writeError('getList - 数据返回失败'))

//     // 判断该人是否存在 ? 存在update : 否则insert
//     if (data.length) {
//       let isUpdate = false
//       for (let item of data) {
//         if (item.name === name) {
//           isUpdate = true
//           break
//         }
//       }
//       if (isUpdate) sqlExecute = $sql.update
//     }

//     connectionDatabase(sqlExecute, sqlParam).then(succRes => {
//       resolve(Utils.writeSuccess())
//     }).catch(errRes => {
//       reject(Utils.writeError('updateData - 失败', errRes))
//     })
//   })
// }


// 插入数据
async function addOrder(options) {
  let name = options.name
  let orderStatus = options.orderStatus
  let _Date = new Date()
  let orderDate = _Date.Format('yyyy-MM-dd')
  let orderTime = parseInt(_Date.getTime())

  if (!name || !orderDate) return Utils.writeError('addOrder: name和orderStatus是必须参数')

  let sqlExecute = $sql.insertOrder
  let sqlParam = [name, orderStatus, orderDate, orderTime]

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
  let name = options.name
  let orderDate = options.orderDate

  if (!name || !orderDate) return Utils.writeError('isAction: name和orderDate是必须参数')

  let sqlExecute = $sql.queryAction
  let sqlParam = [name, orderDate]

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
  let name = options.name
  let orderDate = options.orderDate

  if (!name || !orderDate) return Utils.writeError('orderStatus: name和orderDate是必须参数')

  let sqlExecute = $sql.queryOrderStatus
  let sqlParam = [name, orderDate]

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
async function getSubmit(options) {
  let date = options.date

  if (!date) return Utils.writeError('getSubmit: date是必须参数')

  let sqlExecute = $sql.getSubmit
  let sqlParam = [date]

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, sqlParam).then(succRes => {
      let status = 0
      // 没有数据，则帮他插入一条status为0的
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