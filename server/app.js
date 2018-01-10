const UTILS = require('./utils')
const express = require('express')
const APP = express()
const PATH = '/node/dinner/'

APP.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'APPlication/json;charset=utf-8')
  next()
})

// 获取列表
APP.get(PATH + 'getList', async(req, res) => {
  try {
    res.send(await UTILS.getList())
  } catch (err) {
    res.send(err)
  }
})

// 清空数据
APP.get(PATH + 'cleanList', async(req, res) => {
  try {
    res.send(await UTILS.cleanList())
  } catch (err) {
    res.send(err)
  }
})


// 插入数据
APP.get(PATH + 'updateData', async(req, res) => {
  let query = req.query
  let name = query.name
  let orderTime = query.orderTime
  let isOrder = query.isOrder === 'false' ? false : true

  try {
    res.send(await UTILS.updateData({ name, isOrder, orderTime }))
  } catch (err) {
    res.send(err)
  }
})


// 用户当前是否已操作
APP.get(PATH + 'isAction', async(req, res) => {
  let name = req.query.name

  try {
    res.send(await UTILS.isAction(name))
  } catch (err) {
    res.send(err)
  }
})



APP.listen(3001, _ => {
  console.log('Dinner System is listening on port 3001!')
})
