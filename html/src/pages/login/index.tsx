import React, { Component, FormEvent } from 'react'
import client from '../../client'
import './index.scss'
import { Card, Input, Button, notification } from 'antd'

interface Istate {
  user: string,
    pwd: string,
    loading: boolean
}
interface IProps {
  history: any
}
export default class Login extends Component < IProps, Istate > {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      loading: false
    }
  }

  handleUserChange = (e: FormEvent < HTMLInputElement > ) => {
    this.setState({
      user: (e.target as HTMLInputElement).value
    })
  }

  handlePwdChange = (e: FormEvent < HTMLInputElement > ) => {
    this.setState({
      pwd: (e.target as HTMLInputElement).value
    })
  }

  handleEnterKey = (e) => {
    if (e.charCode === 13) {
      this.loginSub().catch()
    }
  }

  /** 检查表单 */
  checkForm = () => {
    if (!this.state.user) {
      notification.error({
        message: '登录失败',
        description: '用户名不能为空'
      })
      return false
    }

    if (!this.state.pwd) {
      notification.error({
        message: '登录失败',
        description: '密码不能为空'
      })
      return false
    }

    return true
  }

  loginSub = async () => {
    if (!this.checkForm()) return
    this.setState({ loading: true })
    const postData = {
      user: this.state.user,
      pass: this.state.pwd
    }
    const ajaxURL = 'manager/login'
    const res = await client.post(ajaxURL, postData).catch()
    const data = res.data
    this.setState({ loading: false })
    if (data.errcode !== 0) {
      notification.error({
        message: '登录失败',
        description: data.errmsg
      })
      return
    }
    const now = new Date
    if (+now.getHours() >= 17) {
      // 获取订餐状态
      const res = await client.get(`getSubmit?date=${now.Format('yyyy-MM-dd')}`)
      const _status = res.data.data.status
      // 当前订餐处于打开状态
      if (Boolean(_status)) {
        let lastCloseTime: any = localStorage.getItem('WARN_CLOSE_ORDER')
        if (!lastCloseTime) {
          this.gotoManager()
          return
        } else {
          lastCloseTime = new Date(+lastCloseTime)
          if (lastCloseTime.Format('yyyy-MM-dd') !== now.Format('yyyy-MM-dd')) {
            // 直接处理订餐状态
            this.gotoManager()
            return
          }
        }
      }
    }
    this.props.history.push('/manager')
  }

  private async gotoManager() {
    const now = new Date
    localStorage.setItem('WARN_CLOSE_ORDER', now.getTime() + '')
    const status = 0
    const date = new Date().Format('yyyy-MM-dd')
    const postData = {
      status,
      date
    }
    const res = await client.post(`manager/setSubmit`, postData)
    const code = res.data.errcode
    if (code === 0) {
      notification.success({
        message: '已经到了订餐截止时间啦~~',
        description: '系统已经自动帮您关闭下单入口'
      })
    }
    this.props.history.push('/manager')
  }
  
  render() {
    return (
      <div className=" mainBg">
        <Card className="login-card">
          <div className="text login-item">
            <h3>登录</h3>
            <ul className="login-box">
              <li className="uname">
                <Input type="text" onChange={this.handleUserChange} placeholder="请输入用户名" />
              </li>
              <li className="pwd">
                <Input type="password" onChange={this.handlePwdChange} onKeyPress={this.handleEnterKey} placeholder="请输入密码" />
              </li>
            </ul>
            <div className="login-btn">
              <Button type="primary" onClick={this.loginSub} >登录</Button>
            </div>
          </div>
        </Card>
      </div >
    )
  }
}
