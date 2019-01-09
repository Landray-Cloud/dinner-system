import React, { Component } from 'react'
import { RouteComponentProps, Link } from 'react-router'
// import axios from 'axios'
import './index.scss'
import { Input, Button } from 'antd'
import { hashHistory } from 'react-router'

export default class App extends Component<RouteComponentProps<{}, {}>>{
  constructor(props) {
    super(props)
    this.state = {
      uname: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
    this.checkData = this.checkData.bind(this)
  }

  componentDidMount() {
    // use axios here
  }

  // 正则 不能输入字母和数字
  checkEngAndNum = str => {
    const regx = /^[A-Za-z0-9]*$/
    if (regx.test(str)) {
      return true
    } else {
      return false
    }
  }

  // 判断姓名是否合法
  checkData = userName => {
    const msg = '乖！输入你的真实姓名好不好?'
    if (userName === '' || userName === null) {
      alert(msg)
      return false
    }

    if (this.checkEngAndNum(userName)) {
      alert(msg)
      return false
    }

    if (userName.length > 4) {
      alert(msg)
      return false
    }

    return true
  }

  handleInputChange(e) {
    this.setState({
      uname: e.target.value
    })
  }

  handleSubmitClick = _ => {
    const uname = this.state.uname
    console.log('uname', uname)
    if (!this.checkData(uname)) return
    hashHistory.push('/order')
  }

  render() {
    return (
      <div className="app">
        <Input placeholder="请输入你的名字" allowClear value={this.state.uname} onChange={this.handleInputChange} />
        <Button type="primary" onClick={this.handleSubmitClick}>去点餐</Button>
      </div>
    )
  }
}