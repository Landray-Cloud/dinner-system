import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Home from './pages/home'
import Order from './pages/order'
import { HashRouter, Route, Switch } from 'react-router-dom'
// import { hashHistory as Router, Route, Switch } from 'react-router-dom'
import 'normalize.css'
import './assets/style/antd.less'
import './assets/style/base.scss'
import './assets/font/iconfont.css'
import './shim'

class Index extends Component {
  render() {
    return (
      // <Router>
      <HashRouter>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/order" component={Order} />
        </Switch>
      </HashRouter>
      // </Router>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app') as HTMLElement)
