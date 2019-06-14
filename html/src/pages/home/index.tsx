import React, { Component, FormEvent } from 'react'
import './index.scss'
import { Form, Input, Button, notification, Modal, Select } from 'antd'
import Util from '../../util'
const confirm = Modal.confirm
const Option = Select.Option
const FormItem = Form.Item

interface IProps {
  history: any
}

interface Istate {
  uname: string
  department: any
}

export default class Home extends Component<IProps, Istate> {
  constructor(props) {
    super(props)
    this.state = {
      uname: '',
      department: ''
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

  /** 校验表单 */
  checkData = () => {
    const name = this.state.uname
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
      return flag
    }

    const department = this.state.department

    if (department === '') {
      flag = false
      notification.error({
        message: '乖~~',
        description: '请选择部门'
      })
    }

    return flag
  }

  handleInputChange(e: FormEvent<HTMLInputElement>) {
    this.setState({
      uname: (e.target as HTMLInputElement).value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (!this.checkData()) return
    const uname = this.state.uname
    const department = this.state.department
    confirm({
      title: '温馨提示',
      content: '姓名别乱输哦，以后不给改了哦!',
      cancelText: '我还是改一下吧',
      okText: '确认',
      onOk: () => {
        Util.setNameToLocal(uname)
        localStorage.setItem('department', department)
        this.props.history.push('/order')
      }
    })
  }

  /** 生成部门待选项 */
  generateOpts = () => {
    return Util.deptTable.map(item => (
      <Option key={String(item.value)} value={item.value}>
        {item.label}
      </Option>
    ))
  }

  /** 部门选择改变: 进行搜索请求列表 */
  handleDeptChange = department => {
    console.log('department', department)
    this.setState({ department })
  }

  render() {
    return (
      <div className="form-warp">
        <h1>加班订餐系统</h1>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            <Input placeholder="你的名字" value={this.state.uname} onChange={this.handleInputChange} />
          </FormItem>
          <FormItem>
            <Select className="table-select" allowClear={true} placeholder="你的部门" onChange={this.handleDeptChange}>
              {this.generateOpts()}
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
