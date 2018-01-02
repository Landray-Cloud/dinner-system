const utils = require('./utils')
const express = require('express');
const app = express();

app.get('/node/dinner/getData', (req, res) => {
    utils.getData(dbRes => {
        res.send(dbRes)
    })
})

app.get('/node/dinner/insertData', (req, res) => {
    let query = req.query

    utils.insertData({
        name: query.name,
        isOrder: query.isOrder,
    }, dbRes => {
        res.send(dbRes)
    })
})

app.get('/node/dinner/cleanData', (req, res) => {
    let query = req.query

    utils.cleanData(dbRes => {
        res.send(dbRes)
    })
})

app.listen(3001, _ => {
    console.log('listening on port 3001!');
});
