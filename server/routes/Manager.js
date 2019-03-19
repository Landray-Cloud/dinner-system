const express = require('express')
const router = express.Router()
const Manager = require('../modules/Manager')
const auth = require('../components/auth')
const AUTH_ERROR = { auth: 0 } // 统一登录失败
const __IS_DEV__ = false

// 后台登录
router.post('/login', async (req, res) => {
  try {
    const r = await Manager.login(req.body)
    const token = auth.setToken(r.data.user)
    // console.log('插入cookie的token:', token)
    res.cookie('Angelebaby', token)
    res.send(r)
  } catch (err) {
    res.send(err)
  }
})

// 获取数据列表
router.get('/getList', async (req, res, next) => {
  if (!auth.checkToken(req.cookies.Angelebaby) && !__IS_DEV__) return res.send(AUTH_ERROR)
  try {
    res.send(await Manager.getList(req.query))
  } catch (err) {
    res.send(err)
  }
})

// 根据ID更新单条数据
router.post('/updateDataById', async (req, res) => {
  if (!auth.checkToken(req.cookies.Angelebaby) && !__IS_DEV__) return res.send(AUTH_ERROR)
  try {
    res.send(await Manager.updateDataById(req.body))
  } catch (err) {
    res.send(err)
  }
})

// 设置某日是否可以提交加班订餐记录
router.post('/setSubmit', async (req, res) => {
  if (!auth.checkToken(req.cookies.Angelebaby) && !__IS_DEV__) return res.send(AUTH_ERROR)
  try {
    res.send(await Manager.setSubmit(req.body))
  } catch (err) {
    res.send(err)
  }
})

// 删除某条订餐信息记录
router.post('/deleteOrder', async (req, res) => {
  if (!auth.checkToken(req.cookies.Angelebaby) && !__IS_DEV__) return res.send(AUTH_ERROR)
  try {
    res.send(await Manager.deleteOrder(req.body))
  } catch (err) {
    res.send(err)
  }
})

// 获取日常订餐数据列表
router.get('/getStatusList', async (req, res, next) => {
  if (!auth.checkToken(req.cookies.Angelebaby) && !__IS_DEV__) return res.send(AUTH_ERROR)
  try {
    res.send(await Manager.getStatusList(req.query))
  } catch (err) {
    res.send(err)
  }
})

// 获取订餐数据列表（以部门为维度）
router.get('/getListByDepartment', async (req, res, next) => {
  if (!auth.checkToken(req.cookies.Angelebaby) && !__IS_DEV__) return res.send(AUTH_ERROR)
  try {
    res.send(await Manager.getListByDepartment(req.query))
  } catch (err) {
    res.send(err)
  }
})

// 设置订餐管理员名字
router.post('/setDinnerManager', async (req, res) => {
  if (!auth.checkToken(req.cookies.Angelebaby) && !__IS_DEV__) return res.send(AUTH_ERROR)
  try {
    res.send(await Manager.setDinnerManager(req.body))
  } catch (err) {
    res.send(err)
  }
})

module.exports = router