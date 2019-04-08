import React, { Component } from 'react'
import client from '../../client'
import Util from '../../util'
import './index.scss'
import { Form, Input, Button, Select, notification, Popover, Modal } from 'antd'
const Option = Select.Option
const FormItem = Form.Item
const confirm = Modal.confirm

interface IProps {
  history: any
}

interface IState {
  week: string,
  orderDate: string,
  name: string,
  orderStatusModel: string | number,
  submitStatus: any,
  loading: boolean,
  dinnerManager: string,
  form: {
    [k: string]: string | number
  }
}

export default class Order extends Component<IProps, IState>{
  constructor(props) {
    super(props)
    this.state = {
      week: '',
      orderDate: '',
      name: '',
      orderStatusModel: 0, // 本地用
      submitStatus: '', // 当前是否允许提交的状态
      loading: false,
      dinnerManager: '',
      form: {
        orderStatus: 0, // 提交用
        restaurant: '', // 选择了的餐厅
        department: '', // 所在部门
        remarks: ''
      }
    }
    this.handleOrderStatusChange = this.handleOrderStatusChange.bind(this)
    this.handleRestaurantChange = this.handleRestaurantChange.bind(this)
    this.handleRemarksChange = this.handleRemarksChange.bind(this)
    this.handleDeptChange = this.handleDeptChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const name = Util.getNameFromLocal()
    if (name) {
      const date = new Date()
      const orderDate = date.Format('yyyy-MM-dd')
      const week = date.Format('yyyy-MM-dd u')
      this.setState({ name, orderDate, week }, () => {
        this.getSubmitStatus().catch()
        this.getOrderStatus().catch()
      })
      this.getDinnerManager().catch()
      this.getLocalDept()
    } else {
      this.props.history.push('/')
    }
  }

  /** 查询当前订餐状态 */
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

  /** 查询缓存中的部门值 */
  getLocalDept() {
    const department = localStorage.getItem('department')
    if (department) {
      const form = Object.assign({}, this.state.form, { department: parseInt(department, 10) }) // parseInt第二参数默认是10进制，解决tslint校验
      this.setState({ form })
    }
  }

  /** 查询当前是否允许提交的状态 */
  async getSubmitStatus() {
    const date = this.state.orderDate
    const ajaxURL = `getSubmit?date=${date}`
    const res = await client.get(ajaxURL)
    const submitStatus = res.data.data.status
    this.setState({ submitStatus })
  }

  /** 获取订餐负责人名字 */
  async getDinnerManager() {
    let dinnerManager = await Util.getDinnerManager()
    if (!dinnerManager || dinnerManager === '') dinnerManager = '订餐负责人'
    this.setState({ dinnerManager })
  }

  /** 加班状态赋值 */
  handleOrderStatusChange(orderStatus) {
    const form = Object.assign({}, this.state.form, { orderStatus })
    this.setState({ form })
  }

  /** 选择部门赋值 */
  handleDeptChange(department) {
    confirm({
      title: '温馨提示',
      content: '这个功能是给调整了组织架构的同学使用的，你确定要更改部门？',
      cancelText: '取消，我手滑了',
      okText: '确认',
      onOk: () => {
        localStorage.setItem('department', department)
        const form = Object.assign({}, this.state.form, { department: parseInt(department, 10) })
        this.setState({ form })
      }
    })
  }

  /** 选择订餐厅赋值 */
  handleRestaurantChange(restaurant) {
    const form = Object.assign({}, this.state.form, { restaurant })
    this.setState({ form })
  }

  /** 备注 赋值 */
  handleRemarksChange(e) {
    const remarks = e.target.value
    const form = Object.assign({}, this.state.form, { remarks })
    this.setState({ form })
  }

  /** 检查表单 */
  checkForm() {
    const form = this.state.form
    if (!form.orderStatus) {
      notification.error({
        message: '嘿',
        description: '你到底加不加班?'
      })
      return false
    }
    if (!form.remarks && form.orderStatus !== 3) {
      notification.error({
        message: '嘿',
        description: '要在备注里写上加班原因哦'
      })
      return false
    }
    return true
  }

  /** 提交 */
  async handleSubmit(e) {
    e.preventDefault()
    if (!this.checkForm()) return
    this.setState({ loading: true })
    const postData = this.state.form
    postData.name = this.state.name
    // console.log('postData', postData)
    const res = await client.post('addOrder', postData)
    if (!res) {
      this.setState({ loading: false })
      return
    }
    this.setState({ orderStatusModel: postData.orderStatus, loading: false })
  }

  /** 生成部门选项 */
  generateDepts() {
    return Util.deptTable.map((item) => <Option key={String(item.value)} value={item.value}>{item.label}</Option>)
  }

  /** 生成选项菜单 */
  // generateOpts() {
  //   const week = this.state.week
  //   let opts = [
  //     '真功夫(快餐)',
  //     '永和豆浆(快餐)',
  //     '米多面多',
  //     '潮梅里卤鹅',
  //     '马来一号',
  //     '港岛记'
  //   ]

  //   if (week === '星期四') {
  //     opts = [
  //       '壹定食(快餐)',
  //       '吃个汤(椰子汤)',
  //       '金牌隆江猪脚烧腊(烧腊)',
  //       '起家一头牛',
  //       '盒悦',
  //       '红荔村肠粉'
  //     ]
  //   }
  //   return opts.map((text, idx) => <Option key={String(idx)} value={text}>{text}</Option>)
  // }

  render() {
    const name = this.state.name
    const week = this.state.week
    const dinnerManager = this.state.dinnerManager
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 }
    }

    const popoverContent = (
      <img src={require('../../assets/images/qrcode.jpg')} alt="微信小程序'决定'" />
    )

    let bodyJSX = (
      <Form className="order-form" layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem label="部门" {...formItemLayout}>
          <Select placeholder="请选择" value={this.state.form.department} onChange={this.handleDeptChange}>
            {this.generateDepts()}
          </Select>
        </FormItem>
        <FormItem label="加班" {...formItemLayout}>
          <Select placeholder="请选择" onChange={this.handleOrderStatusChange}>
            <Option value={1}>加班订餐</Option>
            <Option value={2}>加班不订餐</Option>
            <Option value={3}>不加班不订餐</Option>
          </Select>
        </FormItem>
        {/* <FormItem label="吃啥" {...formItemLayout}>
          <Select placeholder="请选择" onChange={this.handleRestaurantChange}>
            {this.generateOpts()}
          </Select>
        </FormItem> */}
        <FormItem label="事由" {...formItemLayout}>
          <Input data-id="remarks" placeholder="可以写写因啥事加班?" allowClear={true} value={this.state.form.remarks} onChange={this.handleRemarksChange} />
        </FormItem>
        {/* <FormItem label="时间" {...formItemLayout}>
          <DatePicker 
            className="orderdate" 
          />
        </FormItem> */}
        <FormItem className="action-item">
          <Popover content={popoverContent} title="来呀，快用微信扫我呀！">
            <span className="order-tips">纠结要不要加班?</span>
          </Popover>
          <Button type="primary" htmlType="submit" loading={this.state.loading}>提交</Button>
        </FormItem>
      </Form>
    )

    // 如果点餐过了
    const orderStatusModel = this.state.orderStatusModel
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
        <p className="tips-text">今天你<span>{orderText}</span>，如有变动，请联系{dinnerManager}。</p>
      )
    }

    // 如果当前不给点餐
    const submitStatus = this.state.submitStatus
    if (submitStatus === 0) {
      bodyJSX = (
        <p className="tips-text">现在<span>不许下单</span>啦，如有疑问，请联系{dinnerManager}。</p>
      )
    }

    return (
      <div className="form-warp">
        <h2>你好呀，{name}。今天是 {week}</h2>
        {bodyJSX}
      </div>
    )
  }
}