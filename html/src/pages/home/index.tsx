import React, { Component, FormEvent } from 'react'
import './index.scss'
import { Form, Input, Button, notification, Modal } from 'antd'
import Util from '../../util'
const confirm = Modal.confirm

interface IProps {
  history: any
}

interface Istate {
  uname: string
}

export default class App extends Component<IProps, Istate> {
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
      this.props.history.push('/order')
    }
  }

  /** 判断姓名是否合法 传入需要被检验的名字 */
  checkData = (name: string) => {
    let flag = true
    if (name === '') {
      flag = false
    }

    if (Util.checkEngAndNum(name)) {
      flag = false
    }

    if (name.length < 2) {
      flag = false
    }

    if (name.length > 4) {
      flag = false
    }

    if (!flag) {
      notification.error({
        message: '乖~~',
        description: '输入你的真实姓名好不好?'
      })
    }

    return flag
  }

  handleInputChange(e: FormEvent<HTMLInputElement>) {
    this.setState({
      uname: (e.target as HTMLInputElement).value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const uname = this.state.uname
    if (!this.checkData(uname)) return
    confirm({
      title: '温馨提示',
      content: '姓名别乱输哦，以后不改给了哦!',
      cancelText: '我还是改一下吧',
      okText: '确认',
      onOk: () => {
        Util.setNameToLocal(uname)
        this.props.history.push('/order')
      }
    })
  }

  render() {
    return (
      <div className="form-warp">
        <h1>加班点餐系统</h1>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item>
            <Input placeholder="请输入你的名字" value={this.state.uname} onChange={this.handleInputChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}