import React, { Component, FormEvent } from 'react'
import { RouteComponentProps, hashHistory } from 'react-router'
import './index.scss'
import { Form, Input, Button, notification, Modal } from 'antd'
import Util from '../../util'
const FormItem = Form.Item
const confirm = Modal.confirm

interface IState {
  uname: string
}

export default class App extends Component<RouteComponentProps<{}, {}>, IState>{
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
      // hashHistory.push('/order')
    }
  }

  // 正则 不能输入字母和数字
  checkEngAndNum = (str: string) => {
    const regx = /^[A-Za-z0-9]*$/
    if (regx.test(str)) {
      return true
    } else {
      return false
    }
  }

  // 判断姓名是否合法
  checkData = (userName: string) => {
    let flag = true
    if (userName === '') {
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

  handleInputChange(e: FormEvent<HTMLInputElement>) {
    this.setState({
      uname: (e.target as HTMLInputElement).value
    })
  }

  handleSubmit = () => {
    const uname = this.state.uname
    // console.log('uname', uname)
    if (!this.checkData(uname)) return

    confirm({
      title: '温馨提示',
      content: '姓名别乱输哦，以后不改给了哦!',
      onOk() {
        Util.setNameToLocal(uname)
        hashHistory.push('/order')
      }
    })
  }

  render() {
    return (
      <div className="form-warp">
        <h1>加班点餐系统</h1>
        <Form inline={true} onSubmit={this.handleSubmit}>
          <FormItem label="姓名">
            <Input placeholder="请输入你的名字" value={this.state.uname} onChange={this.handleInputChange} />
          </FormItem>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form>
      </div>
    )
  }
}