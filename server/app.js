const utils = require('./utils')
const express = require('express');
const app = express();

app.get('/getData', (req, res) => {
  utils.getData(data => {
    res.send(data)
  })
})

app.get('/insertData', (req, res) => {
  let query = req.query

  utils.insertData({
    name: query.name,
    isOrder: query.isOrder
  })

  res.end()
})

app.listen(3000, _ => {
  console.log('listening on port 3000!');
});
