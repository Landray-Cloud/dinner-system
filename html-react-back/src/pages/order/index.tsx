import React, { Component } from 'react'
import { RouteComponentProps, hashHistory } from 'react-router'
import client from '../../client'
import Util from '../../util'
import './index.scss'
import { Form, Input, Button, Select, notification } from 'antd'
const Option = Select.Option
const FormItem = Form.Item

export default class App extends Component<RouteComponentProps<{}, {}>>{
  constructor(props) {
    super(props)
    this.state = {
      week: '',
      orderDate: '',
      restaurant: '', // 选择了的餐厅
      name: '',
      orderStatusModel: 0, // 本地用
      submitStatus: '', // 当前是否允许提交的状态
      form: {
        orderStatus: 0, // 提交用
        remarks: ''
      }
    }
    this.handleOrderStatusChange = this.handleOrderStatusChange.bind(this)
    this.handleRestaurantChange = this.handleRestaurantChange.bind(this)
    this.handleRemarksChange = this.handleRemarksChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // 查询当前订餐状态
  async getOrderStatus() {
    const name = Util.getNameFromLocal()
    const orderDate = this.state.orderDate
    const ajaxURL = `orderStatus?name=${name}&orderDate=${orderDate}`
    const res = await client.get(ajaxURL)
    const orderStatusModel = res.data.data.orderStatus
    if (orderStatusModel) {
      this.setState({ orderStatusModel })
    }
  }

  // 查询当前是否允许提交的状态
  async getSubmitStatus() {
    const date = this.state.orderDate
    const ajaxURL = `getSubmit?date=${date}`
    const res = await client.get(ajaxURL)
    const submitStatus = res.data.data.status
    this.setState({ submitStatus })
  }

  componentDidMount() {
    const name = Util.getNameFromLocal()
    if (name) {
      const date = new Date()
      const orderDate = date.Format('yyyy-MM-dd')
      const week = date.Format('yyyy-MM-dd u')
      this.setState({ name, orderDate, week }, () => {
        this.getSubmitStatus()
        this.getOrderStatus()
      })
    } else {
      hashHistory.push('/')
    }
  }

  // 加班状态赋值
  handleOrderStatusChange(orderStatus) {
    const form = Object.assign({}, this.state.form, { orderStatus })
    this.setState({ form })
  }

  // 选择订餐厅赋值
  handleRestaurantChange(restaurant) {
    this.setState({ restaurant })
  }

  // 备注 赋值
  handleRemarksChange(e) {
    const remarks = e.target.value
    const form = Object.assign({}, this.state.form, { remarks })
    this.setState({ form })
  }

  // 检查表单
  checkForm() {
    const form = this.state.form
    if (!form.orderStatus) {
      notification.error({
        message: '',
        description: '你到底加不加班?'
      })
      return false
    }

    if (!form.remarks) {
      notification.error({
        message: '',
        description: '要在备注里写上加班原因哦'
      })
      return false
    }

    return true
  }

  // 提交
  async handleSubmit(e) {
    if (!this.checkForm()) return
    const postData = this.state.form
    postData.name = this.state.name
    const restaurant = this.state.restaurant
    if (restaurant) {
      postData.remarks = `[${restaurant}] ${postData.remarks}`
    }
    const orderStatus = parseInt(postData.orderStatus)
    postData.orderStatus = orderStatus
    // console.log('postData', postData)
    const res = await client.post('addOrder', postData)
    this.setState({ orderStatusModel: orderStatus })
  }

  // 生成选项菜单
  generateOpts() {
    const week = this.state.week
    const arr = []
    let opts = [
      '真功夫(快餐)',
      '永和豆浆(快餐)',
      '米多面多',
      '潮梅里卤鹅',
      '马来一号',
      '港岛记'
    ]

    if (week === '星期四') {
      opts = [
        '壹定食(快餐)',
        '吃个汤(椰子汤)',
        '金牌隆江猪脚烧腊(烧腊)',
        '起家一头牛',
        '盒悦',
        '红荔村肠粉'
      ]
    }

    if (opts.length > 0) {
      for (const text of opts) {
        arr.push(
          <Option value={text}>{text}</Option>
        )
      }
    }

    return arr
  }

  render() {
    const name = this.state.name
    const week = this.state.week
    const adminName = '新梅'

    const menuOptsEle = this.generateOpts()
    let bodyJSX = (
      <Form horizontal={true} onSubmit={this.handleSubmit}>
        <FormItem label="加班" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          <Select placeholder="请选择" onChange={this.handleOrderStatusChange}>
            <Option value="1">加班订餐</Option>
            <Option value="2">加班不订餐</Option>
            <Option value="3">不加班不订餐</Option>
          </Select>
        </FormItem>
        <FormItem label="吃啥" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          <Select placeholder="请选择" onChange={this.handleRestaurantChange}>
            {menuOptsEle}
          </Select>
        </FormItem>
        <FormItem label="备注" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          <Input data-id="remarks" placeholder="可以写写因啥事加班?" allowClear={true} value={this.state.form.remarks} onChange={this.handleRemarksChange} />
        </FormItem>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form>
    )

    // 如果点餐过了
    const orderStatusModel = parseInt(this.state.orderStatusModel)
    if (orderStatusModel > 0) {
      let orderText = ''
      switch (orderStatusModel) {
        case 1:
          orderText = '加班订餐'
          break
        case 2:
          orderText = '加班不订餐'
          break
        case 3:
          orderText = '不加班不订餐'
          break
      }
      bodyJSX = (
        <p className="tips-text">今天你<span>{orderText}</span>，如有变动，请联系{adminName}。</p>
      )
    }

    // 如果当前不给点餐
    const submitStatus = this.state.submitStatus
    if (submitStatus === 0) {
      bodyJSX = (
        <p className="tips-text">现在<span>不许下单</span>啦，如有疑问，请联系{adminName}。</p>
      )
    }

    return (
      <div className="form-warp">
        <h2>你好呀，{name}。今天是{week}</h2>
        {bodyJSX}
      </div>
    )
  }
}