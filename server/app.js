const utils = require('./utils')
const express = require('express')
const app = express()
const path = '/node/dinner/'
const getmac = require('getmac')

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// 获取列表
app.get(path + 'getData', (req, res) => {
  utils.getData(dbRes => {
    res.send(dbRes)
  })
})

// 插入数据
app.get(path + 'insertData', (req, res) => {
  let query = req.query
  let isOrder = true
  if (query.isOrder === 'false') isOrder = false

  getmac.getMac((err, macAddress) => {
    if (err) throw err
    utils.insertData({
      name: query.name,
      isOrder: isOrder,
      orderTime: query.orderTime,
      mac: macAddress
    }, dbRes => {
      res.send(dbRes)
    })
  })
})

// 用户当天是否点餐
app.get(path + 'isOrder', (req, res) => {
  getmac.getMac((err, macAddress) => {
    if (err) throw err
    utils.getData(dbRes => {
      let data = dbRes.data
      let isOrder = false
      for (let item of data) {
        if (item.mac === macAddress) isOrder = true
        break
      }
      return res.send({ isOrder, errmsg: 'ok', errcode: 0 })
    })
  })
})

// 清空数据
app.get(path + 'cleanData', (req, res) => {
  let query = req.query

  utils.cleanData(dbRes => {
    res.send(dbRes)
  })
})

app.listen(3001, _ => {
  console.log('Dinner System is listening on port 3001!')
})
