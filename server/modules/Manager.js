'use strict'
const connectionDatabase = require('../dao/connectionDatabase')
const $sql = require('../dao/Manager')
const Utils = require('../utils')
const log4js = require('log4js')
const crypto = require('crypto')
const logger = log4js.getLogger()
logger.level = 'debug'

// 生成md5密文
const _cryptPwd = str => { return crypto.createHash('md5').update(str).digest('hex') }

// 管理员登录
async function login(options) {
  const user = options.user
  const pass = options.pass

  if (!user || !pass) return Utils.writeError('login: user和pass是必须参数')

  const sqlExecute = $sql.login
  const sqlParam = [user, _cryptPwd(pass)]

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, sqlParam).then(succRes => {
      if (!succRes.length) return reject(Utils.writeError('用户名或密码错误'))
      resolve(Utils.writeSuccess({ isLogin: true }))
    }).catch(errRes => {
      reject(Utils.writeError('login - 失败', errRes))
    })
  })
}

// 获取数据列表
async function getList(options) {
  let sqlExecute = $sql.queryListAll
  let sqlParam = null
  const name = options.name
  const orderDate = options.orderDate
  const department = options.department

  if (name && orderDate && department) { // 同时查询 日期 名字 部门
    sqlExecute = $sql.queryListByNameAndDateAndDept
    sqlParam = [name, orderDate, department]
  } else if (department && orderDate) { // 同时查询 日期 部门
    sqlExecute = $sql.queryListByDateAndDept
    sqlParam = [orderDate, department]
  } else if (name && orderDate) { // 同时查询 日期 名字
    sqlExecute = $sql.queryListByNameAndDate
    sqlParam = [name, orderDate]
  } else if (name) { // 查询名字
    sqlExecute = $sql.queryListByName
    sqlParam = '%' + name + '%'
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
  const orderStatus = options.orderStatus
  const name = options.name
  const id = options.id
  const remarks = options.remarks || ''
  const department = options.department
  const restaurant = options.restaurant || ''
  const sqlExecute = $sql.updateById
  const sqlParam = [orderStatus, name, remarks, department, restaurant, id]

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
  const id = options.id
  const sqlExecute = $sql.deleteById

  if (!id) return Utils.writeError('deleteOrder: id是必须参数')

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, id).then(succRes => {
      resolve(Utils.writeSuccess())
    }).catch(errRes => {
      reject(Utils.writeError('deleteOrder - 失败', errRes))
    })
  })
}


// 设置某日是否可以提交加班订餐记录
async function setSubmit(options) {
  const date = options.date
  const status = options.status

  if (!date || typeof status === 'undefined') return Utils.writeError('setSubmit: date和status是必须参数')

  // 这里为何直接是UPDATE而不是INSERT呢？
  // 因为下面调用getSubmit的时候，如果遇到没有数据，则可以先insert了
  const sqlExecute = $sql.setSubmitUpdate
  const sqlParam = [status, date]
  const getSub = await require('./Index').getSubmit({ date })

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, sqlParam).then(succRes => {
      resolve(Utils.writeSuccess())
    }).catch(errRes => {
      reject(Utils.writeError('setSubmit - 失败', errRes))
    })
  })
}

/** 获取日常订餐数据列表 */
async function getStatusList(options) {
  let sqlExecute = 'SELECT orderStatus, COUNT(id) AS total FROM list '
  let sqlParam = []

  if (JSON.stringify(options) !== '{}') {
    sqlExecute += ' WHERE '

    const orderDate = options.orderDate
    const department = options.department

    if (orderDate) {
      sqlExecute += ' orderDate LIKE ? '
      sqlParam.push(`%${orderDate}%`)
    }

    if (department) {
      if (sqlParam.length) sqlExecute += ' AND '
      sqlExecute += ' department = ? '
      sqlParam.push(department)
    }
  }

  sqlExecute += ' GROUP BY orderStatus'

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, sqlParam).then(succRes => {
      resolve(Utils.writeSuccess(succRes))
    }).catch(errRes => {
      reject(Utils.writeError('getStatusList - 失败', errRes))
    })
  })
}

/** 获取订餐数据列表（以部门为维度） */
async function getListByDepartment(options) {
  let sqlExecute = 'SELECT department,orderStatus,count(orderStatus) as total FROM list'
  let sqlParam = []

  if (JSON.stringify(options) !== '{}') {
    sqlExecute += ' WHERE '

    const orderDate = options.orderDate
    const department = options.department

    if (orderDate) {
      sqlExecute += ' orderDate LIKE ? '
      sqlParam.push(`%${orderDate}%`)
    }

    if (department) {
      if (sqlParam.length) sqlExecute += ' AND '
      sqlExecute += ' department = ? '
      sqlParam.push(department)
    }
  }

  sqlExecute += ' GROUP BY department,orderStatus'

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, sqlParam).then(succRes => {
      resolve(Utils.writeSuccess(succRes))
    }).catch(errRes => {
      reject(Utils.writeError('getListByDepartment - 失败', errRes))
    })
  })
}

// 设置订餐管理员名字
async function setDinnerManager(options) {
  const name = options.name

  if (!name || typeof name === 'undefined') return Utils.writeError('setDinnerManager: name是必须参数')

  const sqlExecute = $sql.setDinnerManager
  const sqlParam = [name]

  return new Promise((resolve, reject) => {
    connectionDatabase(sqlExecute, sqlParam).then(succRes => {
      resolve(Utils.writeSuccess())
    }).catch(errRes => {
      reject(Utils.writeError('setDinnerManager - 失败', errRes))
    })
  })
}

module.exports = {
  login,
  getList,
  updateDataById,
  deleteOrder,
  setSubmit,
  getStatusList,
  getListByDepartment,
  setDinnerManager
}