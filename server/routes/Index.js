const express = require('express')
const router = express.Router()
const Index = require('../apps/Index')

// 插入数据 (用户侧)
router.post('/addOrder', async(req, res, next) => {
  let param = req.body
  try {
    res.send(await Index.addOrder(param))
  } catch (err) {
    res.send(err)
  }
})

// 某用户某天是否已做了选择
router.get('/isAction', async(req, res, next) => {
  try {
    res.send(await Index.isAction(req.query))
  } catch (err) {
    res.send(err)
  }
})

// 用户当前是否已点餐
router.get('/orderStatus', async(req, res, next) => {
  try {
    res.send(await Index.orderStatus(req.query))
  } catch (err) {
    res.send(err)
  }
})

// 获取某日是否可以提交加班订餐记录
router.get('/getSubmit', async(req, res, next) => {
  try {
    res.send(await Index.getSubmit(req.query))
  } catch (err) {
    res.send(err)
  }
})

module.exports = router