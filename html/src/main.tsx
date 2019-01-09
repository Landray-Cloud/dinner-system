import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Home from './pages/home'
import Order from './pages/order'
import { Router, Route, hashHistory } from 'react-router'
import 'normalize.css'
import './assets/style/antd.less'
import './assets/style/base.scss'
import './assets/font/iconfont.css'

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
