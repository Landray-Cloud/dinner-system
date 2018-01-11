'use strict'

const FS = require('fs')
const PATH = '../'
const DB_PATH = PATH + 'db/data.json'
const SUCC_CB = { errmsg: 'ok', errcode: 0 }
const ERROR_CB = { errmsg: 'error', errcode: -1 }

// 获取数据列表
async function getList() {
  return new Promise((resolve, reject) => {
    FS.readFile(DB_PATH, 'utf-8', (err, content) => {
      if (err) return reject(ERROR_CB)

      let data = content ? JSON.parse(content) : []

      let cb = SUCC_CB
      cb.data = data

      resolve(cb)
    })
  })
}

// 清空列表
async function cleanList() {
  return new Promise((resolve, reject) => {
    FS.writeFile(DB_PATH, [], err => {
      if (err) return reject(ERROR_CB)
      resolve(SUCC_CB)
    })
  })
}

// 插入一条数据
async function updateData(options) {
  let dbRes = await getList()

  return new Promise((resolve, reject) => {
    if (!dbRes) return reject(ERROR_CB)

    let data = dbRes.data

    if (!data) return reject(ERROR_CB)

    let index = -1

    // 判断该人是否存在 ? 存在覆盖 : 否则push
    for (let i in data) {
      if (data[i].name === options.name) {
        index = i
        break
      }
    }

    if (index !== -1) {
      data.splice(index, 1, options)
    } else {
      data.push(options)
    }

    data = JSON.stringify(data)

    FS.writeFile(DB_PATH, data, err => {
      if (err) return reject(ERROR_CB)
      resolve(SUCC_CB)
    })
  })
}


// 用户今天是否已做了选择
async function isAction(name) {
  let dbRes = await getList()

  return new Promise((resolve, reject) => {
    if (!dbRes) return reject(ERROR_CB)

    let data = dbRes.data

    if (!data) return reject(ERROR_CB)

    let cb = SUCC_CB
    cb.data = { isAction: false }

    if (!data.length) return reject(cb)

    for (let item of data) {
      if (item.name === name) {
        cb.data.isAction = true
        break
      }
    }
    resolve(cb)
  })
}

// 用户今天是否已点餐
async function isOrder(name) {
  let dbRes = await getList()

  return new Promise((resolve, reject) => {
    if (!dbRes) return reject(ERROR_CB)

    let data = dbRes.data

    if (!data || !data.length) return reject(ERROR_CB)

    let cb = SUCC_CB
    let _isOrder = false

    for (let item of data) {
      if (item.name === name) {
        _isOrder = item.isOrder
        break
      }
    }

    cb.data = { isOrder: _isOrder }
    resolve(cb)
  })
}


module.exports = {
  getList,
  updateData,
  cleanList,
  isAction,
  isOrder
}
