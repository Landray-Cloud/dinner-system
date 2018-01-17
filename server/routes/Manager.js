const express = require('express')
const router = express.Router()
const Manager = require('../apps/Manager')

// 获取数据列表
router.get('/getList', async(req, res, next) => {
  try {
    res.send(await Manager.getList(req.query))
  } catch (err) {
    res.send(err)
  }
})

// 根据ID更新单条数据
router.post('/updateDataById', async(req, res) => {
  try {
    res.send(await Manager.updateDataById(req.body))
  } catch (err) {
    res.send(err)
  }
})

// 后台登录
router.post('/login', async(req, res) => {
  try {
    res.send(await Manager.login(req.body))
  } catch (err) {
    res.send(err)
  }
})

// 设置某日是否可以提交加班订餐记录
router.post('/setSubmit', async(req, res) => {
  try {
    res.send(await Manager.setSubmit(req.body))
  } catch (err) {
    res.send(err)
  }
})

// 删除某条订餐信息记录
router.post('/deleteOrder', async(req, res) => {
  try {
    res.send(await Manager.deleteOrder(req.body))
  } catch (err) {
    res.send(err)
  }
})

module.exports = router