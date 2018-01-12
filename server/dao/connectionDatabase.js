const mysql = require('mysql')
const $conf = require('../config')
const pool = mysql.createPool($conf.mysql)

const connectionDatabase = (sqlExecute, sqlParam = null) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((poolErr, connection) => {
            if (poolErr) return reject(poolErr)
            connection.query(sqlExecute, sqlParam, (sqlErr, dbResult) => {
                if (sqlErr) return reject(sqlErr)
                resolve(dbResult)
                connection.release()
            })
        })
    })
}

module.exports = connectionDatabase