'use strict'

const fs = require('fs')
const path = '../'
const dbPath = path + 'db/data.json'

function getData(cb) {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) return console.log(err)

    if (!data) {
      data = []
    } else {
      data = JSON.parse(data)
    }

    cb && cb({ data, errmsg: 'ok', errcode: 0 })
  })
}

function insertData(obj, cb) {
  getData(res => {
    if (!res) return cb && cb({ errcode: -1 })

    let data = res.data

    if (!data) return cb && cb({ errcode: -2 })

    data.push(obj)

    data = JSON.stringify(data)

    fs.writeFile(dbPath, data, err => {
      if (err) return console.log(err)
      cb && cb({ errmsg: 'ok', errcode: 0 })
    });
  })
}

function cleanData(cb) {
  fs.writeFile(dbPath, [], err => {
    if (err) return console.log(err)
    cb && cb({ errmsg: 'ok', errcode: 0 })
  });
}

module.exports = {
  getData,
  insertData,
  cleanData
}

