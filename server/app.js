const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Index = require('./routes/Index')
const Manager = require('./routes/Manager')

app.use(bodyParser.json())  // 解析 application/json
app.use(bodyParser.urlencoded({ extended: false }))

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'APPlication/json;charset=utf-8')
  next()
})

app.use('/node/dinner/', Index)
app.use('/node/dinner/manager', Manager)


app.listen(3001, _ => {
  console.log('Dinner System is listening on port 3001 !')
})