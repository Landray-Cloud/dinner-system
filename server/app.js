const utils = require('./utils')
const express = require('express');
const app = express();

app.get('/getData', (req, res) => {
    utils.getData(dbRes => {
        res.send(dbRes)
    })
})

app.get('/insertData', (req, res) => {
    let query = req.query

    utils.insertData({
        name: query.name,
        isOrder: query.isOrder,
    }, dbRes => {
        res.send(dbRes)
    })
})

app.get('/cleanData', (req, res) => {
    let query = req.query

    utils.cleanData(dbRes => {
        res.send(dbRes)
    })
})

app.listen(3000, _ => {
    console.log('listening on port 3000!');
});
