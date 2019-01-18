import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
// import axios from 'axios'
import { Input, Button, Select } from 'antd'
const Option = Select.Option

import './index.scss'

export default class App extends Component<RouteComponentProps<{}, {}>>{
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      form: {
        name: '',
        orderStatus: '',
        remarks: ''
      }
    }
    this.handleOrderStatusChange = this.handleOrderStatusChange.bind(this)
    this.handleRemarksChange = this.handleRemarksChange.bind(this)
    this.handleSubmitClick = this.handleSubmitClick.bind(this)
  }

  componentDidMount() {
    const form = Object.assign({}, this.state.form, { name: '刘德华' })
    this.setState({
      date: new Date().Format('yyyy-MM-dd u'),
      form
    })
  }

  // 加班状态赋值
  handleOrderStatusChange(orderStatus) {
    const form = Object.assign({}, this.state.form, { orderStatus })
    this.setState({ form })
  }

  // 备注 赋值
  handleRemarksChange(e) {
    const remarks = e.target.value
    const form = Object.assign({}, this.state.form, { remarks })
    this.setState({ form })
  }

  // 提交
  handleSubmitClick(e) {
    console.log(this.state.form)
  }

  render() {
    return (
      <div className="app">
        <p>你好呀{this.state.form.name}，今天是{this.state.date}</p>
        <p>你要加班点餐吗?</p>
        <Select placeholder="请选择" style={{ width: 120 }} onChange={this.handleOrderStatusChange}>
          <Option value="1">加班订餐</Option>
          <Option value="2">加班不订餐</Option>
          <Option value="3">不加班不订餐</Option>
        </Select>
        <Input data-id="remarks" placeholder="可以写写因啥事加班?" allowClear value={this.state.form.remarks} onChange={this.handleRemarksChange} />
        <Button type="primary" onClick={this.handleSubmitClick}>提交</Button>
      </div>
    )
  }
}