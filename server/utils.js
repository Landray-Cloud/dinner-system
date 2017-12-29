'use strict'

const fs = require('fs')
const path = './src/'
const dbPath = path + 'db/data.json'

function getData(cb) {
    fs.readFile(dbPath, 'utf-8', (err, data) => {
        if (err) return console.log(err)
        cb && cb(data)
    })
}

function insertData(obj) {
    getData(data => {
        data = JSON.parse(data)
        data.push(obj)
        data = JSON.stringify(data)

        fs.writeFile(dbPath, data, (err) => {
            if (err) return console.log(err)
        });
    })
}

module.exports = {
    getData,
    insertData
}
