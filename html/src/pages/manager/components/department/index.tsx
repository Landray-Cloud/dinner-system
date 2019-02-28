import React, { Component } from 'react'
import client from '../../../../client'
import './index.scss'
import Util from '../../../../util'
import { Table, Tag, Form, Select, DatePicker, notification, LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import moment from 'moment'
const Option = Select.Option
const FormItem = Form.Item

interface IProps {
  history?: any
}
interface Istate {
  orderDate: string,
  department: string | number,
  total: string | number,
  dataSource: any,
  filteredInfo: any
}

export default class Department extends Component<IProps, Istate> {
  constructor(props) {
    super(props)
    this.state = {
      orderDate: '',
      department: '',
      total: '',
      dataSource: [],
      filteredInfo: null
    }
  }

  componentDidMount = () => {
    const orderDate = new Date().Format('yyyy-MM-dd')
    this.setState({ orderDate }, () => {
      this.getList().catch()
    })
  }

  /** 生成部门待选项 */
  generateOpts = () => {
    return Util.deptTable.map((item) => <Option key={String(item.value)} value={item.value}>{item.label}</Option>)
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

  handleTableChange = ( filters ) => {
    console.log(filters)
    // this.setState({ filteredInfo: filters })
  }
  getList = async () => {
    const orderDate = this.state.orderDate
    const department = this.state.department
    let ajaxURL = 'manager/getListByDepartment'
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
    const dataSource = res.data.data
    this.setState({ dataSource })
  }

  render() {
    // let { filteredInfo } = this.state
    // filteredInfo = filteredInfo || {}
    const columns = [{
      title: '序号',
      render: (text, record, index) => `${index + 1}`
    }, {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      render: (department: number) => (
        <span>{Util.getDeptNameFromNum(department)}</span>
      )
    }, {
      title: '状态',
      key: 'orderStatus',
      dataIndex: 'orderStatus',
      filters: [
        { text: '加班订餐', value: '1' },
        { text: '加班不订餐', value: '2' },
        { text: '不加班不订餐', value: '3' }
      ],
      filterMultiple: false,
      onFilter: (value, record) => { return String(record.orderStatus) === value },
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
              <DatePicker defaultValue={moment(new Date(), 'YYYY/MM/DD')} onChange={this.handleDatePickerOnChange}/>
            </LocaleProvider>
          </FormItem>
        </Form>
        <LocaleProvider locale={zh_CN}>
          <Table dataSource={this.state.dataSource} columns={columns} rowKey={record => record.id}/>
        </LocaleProvider>
      </div>
    )
  }
}