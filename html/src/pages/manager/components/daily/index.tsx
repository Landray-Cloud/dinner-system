import React, { Component } from 'react'
import client from '../../../../client'
import './index.scss'
import Util from '../../../../util'
import { Table, Tag, Form, Select, DatePicker, notification, Radio, LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import moment from 'moment'
const { MonthPicker } = DatePicker
const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group

interface IProps {
  history?: any
}

interface Istate {
  orderDate: string,
  department: string | number,
  total: string | number,
  dataSource: any,
  mode: any,
  radioDate: string
}

/** 返回状态的中文 */
function generateStatusName(status: number) {
  let text = ''
  let color = ''
  switch (status) {
    case 1:
      text = '加班订餐'
      color = 'blue'
      break
    case 2:
      text = '加班不订餐'
      color = 'yellow'
      break
    case 3:
      text = '不加班不订餐'
      color = 'red'
      break
  }
  return { text, color }
}

export default class Daily extends Component<IProps, Istate> {
  constructor(props) {
    super(props)
    this.state = {
      orderDate: '',
      department: '',
      total: '',
      dataSource: [],
      mode: 'date',
      radioDate: ''
    }
  }
  componentDidMount = () => {
    const orderDate = new Date().Format('yyyy-MM-dd')
    this.setState({ orderDate }, () => {
      this.getList().catch()
    })
  }

  getList = async () => {
    const orderDate = this.state.orderDate
    const department = this.state.department
    let ajaxURL = 'manager/getStatusList'
    if (department && orderDate) {
      ajaxURL += `?department=${department}&orderDate=${orderDate}`
    } else if (typeof department !== 'undefined' && department !== '') {
      ajaxURL += `&department=${department}`
    } else if (orderDate) {
      ajaxURL += `?orderDate=${orderDate}`
    } else {
      notification.error({
        message: '嘿',
        description: '部门和日期两个不能同时为空'
      })
      return
    }

    const res = await client.get(ajaxURL)
    const dataSource = res.data.data
    this.setState({ dataSource })
  }

  handleRadioChange = (e) => {
    console.log('handleRadioChange', e.target.value)
    this.setState({ mode: e.target.value })
  }

  /** 时间选择改变: 进行搜索请求列表 */
  handleDatePickerOnChange = (date: any, orderDate: string) => {
    this.setState({ orderDate }, () => {
      this.getList().catch()
    })
  }

  /** 部门选择改变: 进行搜索请求列表 */
  handleDeptChange = (department) => {
    this.setState({ department }, () => {
      this.getList().catch()
    })
  }

  /** 生成部门待选项 */
  generateOpts = () => {
    return Util.deptTable.map((item) => <Option key={String(item.value)} value={item.value}>{item.label}</Option>)
  }
  render() {
    const columns = [{
      title: '序号',
      render: (text, record, index) => `${index + 1}`
    }, {
      title: '订餐状态',
      key: 'orderStatus',
      dataIndex: 'orderStatus',
      render: (orderStatus: number) => {
        return (
          <Tag color={generateStatusName(orderStatus).color}>{generateStatusName(orderStatus).text}</Tag>
        )
      }
    }, {
      title: '人数',
      dataIndex: 'total',
      key: 'total'
    }]

    return (
      <div className="daily-wrapper">
        <Form layout="inline">
          <FormItem label="部门">
            <Select className="table-select" allowClear={true} placeholder="请选择" onChange={this.handleDeptChange}>
              {this.generateOpts()}
            </Select>
          </FormItem>
          <FormItem label="日期">
            <LocaleProvider locale={zh_CN}>
              {
                this.state.mode === 'date' ?
                <DatePicker defaultValue={moment(new Date(), 'YYYY/MM/DD')} onChange={this.handleDatePickerOnChange}/>
                : <MonthPicker onChange={this.handleDatePickerOnChange} defaultValue={moment(new Date(), 'YYYY/MM')}/>
              }
            </LocaleProvider>
          </FormItem>
          <FormItem>
          <RadioGroup onChange={this.handleRadioChange} value={this.state.mode}>
            <Radio value="date">按天</Radio>
            <Radio value="month">按月</Radio>
          </RadioGroup>
          </FormItem>
        </Form>

        <Table dataSource={this.state.dataSource} columns={columns} rowKey={record => record.id} />
      </div>
    )
  }
}