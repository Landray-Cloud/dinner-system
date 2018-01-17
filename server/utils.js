'use strict'
const log4js = require('log4js')
const logger = log4js.getLogger()
logger.level = 'debug'

Object.prototype.parseSqlResult = function() {
  return JSON.parse(JSON.stringify(this))
}


Date.prototype.Format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
}

// 统一错误处理
const writeError = (echoMsg, logObj = echoMsg) => {
  logger.error(logObj)
  return { errcode: -1, errmsg: echoMsg }
}

// 统一成功处理
const writeSuccess = (data = {}) => { return { errmsg: 'ok', errcode: 0, data } }


module.exports = {
  writeError,
  writeSuccess
}