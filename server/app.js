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

// 获取数据列表
APP.get(PATH + 'getList', async(req, res) => {
  try {
    res.send(await UTILS.getList(req.query))
  } catch (err) {
    res.send(err)
  }
})


// 插入数据
APP.get(PATH + 'updateData', async(req, res) => {
  try {
    res.send(await UTILS.updateData(req.query))
  } catch (err) {
    res.send(err)
  }
})


// 某用户某天是否已做了选择
APP.get(PATH + 'isAction', async(req, res) => {
  try {
    res.send(await UTILS.isAction(req.query))
  } catch (err) {
    res.send(err)
  }
})


// 用户当前是否已点餐
APP.get(PATH + 'orderStatus', async(req, res) => {
  try {
    res.send(await UTILS.orderStatus(req.query))
  } catch (err) {
    res.send(err)
  }
})


// 后台登录
APP.get(PATH + 'login', async(req, res) => {
  try {
    res.send(await UTILS.login(req.query))
  } catch (err) {
    res.send(err)
  }
})


APP.listen(3001, _ => {
  console.log('Dinner System is listening on port 3001 !')
})