import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
// import axios from 'axios'
import { Form, Input, Button, Select } from 'antd'
import Util from '../../util'
const Option = Select.Option
const FormItem = Form.Item

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
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const localData = localStorage.getItem('DiCaprio')
    if (localData) {
      const obj = Util.getToken(localData)
      if (obj) {
        const name = obj.data
        if (name) {
          const form = Object.assign({}, this.state.form, { name })
          this.setState({ form })
        }
      }
    }
    this.setState({
      date: new Date().Format('yyyy-MM-dd u')
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
  handleSubmit(e) {
    console.log(this.state.form)
  }

  render() {
    const date = this.state.date

    let opts = [
      { label: '真功夫(快餐)', value: 1 },
      { label: '永和豆浆(快餐)', value: 2 },
      { label: '米多面多', value: 3 },
      { label: '潮梅里卤鹅', value: 4 },
      { label: '马来一号', value: 5 },
      { label: '港岛记', value: 6 }
    ]

    let menuOptsEle = []

    if (date === '星期四') {
      opts = [
        { label: '壹定食(快餐)', value: 1 },
        { label: '吃个汤(椰子汤)', value: 2 },
        { label: '金牌隆江猪脚烧腊(烧腊)', value: 3 },
        { label: '起家一头牛', value: 4 },
        { label: '盒悦', value: 5 },
        { label: '红荔村肠粉', value: 6 }
      ]
    }

    if (opts.length > 0) {
      for (let item of opts) {
        menuOptsEle.push(
          <Option value={item.value}>{item.label}</Option>
        )
      }
    }

    return (
      <div className="form-warp">
        <h2>你好呀，{this.state.form.name}。今天是{this.state.date}</h2>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormItem label="操作" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <Select placeholder="请选择" onChange={this.handleOrderStatusChange}>
              <Option value="1">加班订餐</Option>
              <Option value="2">加班不订餐</Option>
              <Option value="3">不加班不订餐</Option>
            </Select>
          </FormItem>
          <FormItem label="吃啥" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <Select placeholder="请选择" onChange={this.handleOrderStatusChange}>
              {menuOptsEle}
            </Select>
          </FormItem>
          <FormItem label="备注" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <Input data-id="remarks" placeholder="可以写写因啥事加班?" allowClear value={this.state.form.remarks} onChange={this.handleRemarksChange} />
          </FormItem>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form>
      </div>
    )
  }
}