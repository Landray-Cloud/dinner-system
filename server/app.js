const utils = require('./utils')
const express = require('express')
const app = express()
const path = '/node/dinner/'

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})

app.get(path + 'getData', (req, res) => {
    utils.getData(dbRes => {
        res.send(dbRes)
    })
})

app.get(path + 'insertData', (req, res) => {
    let query = req.query

    utils.insertData({
        name: query.name,
        isOrder: query.isOrder,
        dateTime: query.dateTime
    }, dbRes => {
        res.send(dbRes)
    })
})

app.get(path +'cleanData', (req, res) => {
    let query = req.query

    utils.cleanData(dbRes => {
        res.send(dbRes)
    })
})

app.listen(3001, _ => {
    console.log('listening on port 3001!')
})
