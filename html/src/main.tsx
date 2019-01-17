import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Home from './pages/home'
import Order from './pages/order'
import { Router, Route, hashHistory } from 'react-router'
import 'normalize.css'
import './assets/style/antd.less'
import './assets/style/base.scss'
import './assets/font/iconfont.css'

Date.prototype.Format = function (fmt) {
  const uConfig = {
    0: '星期日',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六'
  }
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'u+': uConfig[this.getDay()], // 星期
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds()
    // 毫秒
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var i in o) {
      if (new RegExp('(' + i + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[i]) : (('00' + o[i]).substr(('' + o[i]).length)))
      }
    }
    return fmt
  } else {
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
}

class Index extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Home} />
        <Route path="/order" component={Order} />
      </Router>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app') as HTMLElement)
