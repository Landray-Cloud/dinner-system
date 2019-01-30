import React, { Component } from 'react'
import client from '../../client'
import './index.scss'
import { Card, Input, Button, notification } from 'antd'

interface Istate {
  pwd: string,
  userName: string,
  loading: boolean
}
interface IProps {
  history: any
}
export default class Login extends Component<IProps, Istate> {
  constructor(props) {
    super(props)
    this.state = {
      pwd: '',
      userName: '',
      loading: false
    }
  }
  handleEnterKey = (e) => {
    if(e.charCode === 13) {
      this.loginSub()
    }
  }
  loginSub = async () => {
    this.setState({loading: true})
      const params = {
        userName: this.state.userName,
        pwd: this.state.pwd
      }
      const ajaxURL = 'manager/login'
      const res = await client.post(ajaxURL, params)
      if(res.errcode===0) {
        this.setState({loading: false})
        this.props.history.push('/manager')
      } else {
        this.setState({loading: false})
        notification.error({
          message: '登录失败',
          description: res.errmsg
        })
      }
  }

  render() {
    return (
      <div className=" mainBg">
        <Card className="login-card">
          <div className="text login-item">
            <h3>登录</h3>
            <ul className="login-box">
              <li className="uname">
                <Input type="text" placeholder="请输入用户名" />
              </li>
              <li className="pwd">
                <Input type="password" onKeyPress={this.handleEnterKey} placeholder="请输入密码" />
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