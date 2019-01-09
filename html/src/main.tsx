import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AppCmpt from './app'
import { Router, Route, hashHistory } from 'react-router'
import 'normalize.css'
import './assets/style/antd.less'
import './assets/style/base.scss'
import './assets/font/iconfont.css'

class Index extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={AppCmpt} />
      </Router>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app') as HTMLElement)
