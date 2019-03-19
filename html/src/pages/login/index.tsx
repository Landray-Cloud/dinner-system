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
export default class Login extends Component<IProps, Istate> {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      loading: false
    }
  }

  handleUserChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      user: (e.target as HTMLInputElement).value
    })
  }

  handlePwdChange = (e: FormEvent<HTMLInputElement>) => {
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