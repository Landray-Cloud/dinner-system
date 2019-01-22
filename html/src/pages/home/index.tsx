import React, { Component } from 'react'
import { RouteComponentProps, hashHistory } from 'react-router'
// import axios from 'axios'
import './index.scss'
import { Form, Input, Button, notification } from 'antd'
import Util from '../../util'
const FormItem = Form.Item

export default class App extends Component<RouteComponentProps<{}, {}>>{
  constructor(props) {
    super(props)
    this.state = {
      uname: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkData = this.checkData.bind(this)
  }

  componentDidMount() {
    const name = Util.getNameFromLocal()
    if (name) {
      hashHistory.push('/order')
    }
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
    let flag = true
    if (userName === '' || userName === null) {
      flag = false
    }

    if (this.checkEngAndNum(userName)) {
      flag = false
    }

    if (userName.length > 4) {
      flag = false
    }

    if (!flag) {
      notification.error({
        message: '',
        description: '乖！输入你的真实姓名好不好?'
      })
    }

    return flag
  }

  handleInputChange(e) {
    this.setState({
      uname: e.target.value
    })
  }

  handleSubmit = _ => {
    const uname = this.state.uname
    // console.log('uname', uname)
    if (!this.checkData(uname)) return

    Util.setNameToLocal(uname)

    hashHistory.push('/order')
  }

  render() {
    return (
      <div className="form-warp">
        <h1>加班点餐系统</h1>
        <Form inline onSubmit={this.handleSubmit}>
          <FormItem label="姓名">
            <Input placeholder="请输入你的名字" value={this.state.uname} onChange={this.handleInputChange} />
          </FormItem>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form>
      </div>
    )
  }
}