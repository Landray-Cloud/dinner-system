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
  inDay: any,
  inMonth: any
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
      inDay: moment(new Date(), 'yyyy-MM-dd'),
      inMonth: moment(new Date(), 'yyyy-MM')
    }
  }
  componentDidMount = () => {
    const orderDate = new Date().Format('yyyy-MM-dd')
    this.setState({orderDate}, () => {
      this.getList().catch()
    })
  }
  

  handleRadioChange = (e) => {
    const mode = e.target.value
    let orderDate
    if(mode === 'date') {
      orderDate = new Date().Format('yyyy-MM-dd')
    } else if (mode === 'month') {
      orderDate = new Date().Format('yyyy-MM')
    }
    this.setState({ mode, orderDate }, () => {
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
      ajaxURL += `?department=${department}`
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
    const data = res.data.data
    data.map((item, index) => {
      item.key = index
    })
    const dataSource = data
    this.setState({ dataSource })
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
          <Tag color={Util.generateStatusName(orderStatus).color}>{Util.generateStatusName(orderStatus).text}</Tag>
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
                <DatePicker defaultValue={this.state.inDay} onChange={this.handleDatePickerOnChange}/>
                : <MonthPicker defaultValue={this.state.inMonth} onChange={this.handleDatePickerOnChange}/>
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

        <Table dataSource={this.state.dataSource} columns={columns} rowKey="key" />
      </div>
    )
  }
}