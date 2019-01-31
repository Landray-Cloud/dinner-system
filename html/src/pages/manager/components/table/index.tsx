import React, { Component } from 'react'
import client from '../../../../client'
import Util from '../../../../util'
import './index.scss'
import { Input, DatePicker, Table, Divider, Tag, notification, Form, Select } from 'antd'
import moment from 'moment'
const Search = Input.Search
const Option = Select.Option
const FormItem = Form.Item

const dateFormat = 'yyyy-MM-dd'

interface IProps {
  [k: string]: any
}

interface Istate {
  name: string,
  orderDate: string,
  department: string | number,
  dataSource: any
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

export default class SiderDemo extends Component<IProps, Istate> {
  state = {
    name: '',
    orderDate: '',
    department: '',
    dataSource: []
  }

  componentDidMount = () => {
    const orderDate = new Date().Format(dateFormat)
    this.setState({ orderDate }, () => {
      this.getList().catch()
    })
  }

  getList = async () => {
    const orderDate = this.state.orderDate
    const name = this.state.name

    let ajaxURL = 'manager/getList'
    if (name && orderDate) {
      ajaxURL += `?name=${name}&orderDate=${orderDate}`
    } else if (name) {
      ajaxURL += `?name=${name}`
    } else if (orderDate) {
      ajaxURL += `?orderDate=${orderDate}`
    } else {
      notification.error({
        message: '嘿',
        description: '名字和日期两个不能同时为空'
      })
      return
    }
    const department = this.state.department

    if (department) {
      ajaxURL += `&department=${department}`
    }

    const res = await client.get(ajaxURL)
    const dataSource = res.data.data
    this.setState({ dataSource })
  }

  /** 按下搜索按钮: 进行搜索请求列表 */
  handleSearchOnSublimt = (name: string) => {
    console.log('handleSearchOnSublimt', name)
    this.setState({ name }, () => {
      this.getList().catch()
    })
  }

  /** 时间选择改变: 进行搜索请求列表 */
  handleDatePickerOnChange = (date: any, orderDate: string) => {
    console.log('handleDatePickerOnChange', date)
    this.setState({ orderDate }, () => {
      this.getList().catch()
    })
  }

  /** 部门改变 */
  handleDeptChange = (department) => {
    console.log('department', department)
  }

  /** 生成部门待选项 */
  generateOpts = () => {
    return Util.deptTable.map((item) => <Option key={String(item.value)} value={item.value}>{item.label}</Option>)
  }

  render() {
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '提交时间',
      dataIndex: 'orderTime',
      key: 'orderTime',
      render: (orderTime: number) => (
        <span>{new Date(orderTime).Format('yyyy-MM-dd hh:mm')}</span>
      )
    }, {
      title: '吃哪家',
      dataIndex: 'restaurant',
      key: 'restaurant'
    }, {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      render: (department: number) => (
        <span>{Util.getDeptNameFromNum(department)}</span>
      )
    }, {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks'
    }, {
      title: '是否订餐',
      key: 'orderStatus',
      dataIndex: 'orderStatus',
      render: (orderStatus: number) => {
        return (
          <Tag color={generateStatusName(orderStatus).color}>{generateStatusName(orderStatus).text}</Tag>
        )
      }
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">编辑{record.id}</a>
          <Divider type="vertical" />
          <a href="javascript:;">删除</a>
        </span>
      )
    }]

    // const formItemLayout = {
    //   labelCol: { span: 6 },
    //   wrapperCol: { span: 18 }
    // }

    return (
      <div>
        <Form layout="inline">
          <FormItem label="提交日期">
            <DatePicker defaultValue={moment(new Date(), dateFormat)} onChange={this.handleDatePickerOnChange} />
          </FormItem>
          <FormItem label="部门">
            <Select placeholder="为空则全选" onChange={this.handleDeptChange}>
              {this.generateOpts()}
            </Select>
          </FormItem>
          <FormItem>
            <Search
              placeholder="按名字搜索"
              onSearch={this.handleSearchOnSublimt}
              enterButton={true}
            />
          </FormItem>
        </Form>
        <Table dataSource={this.state.dataSource} columns={columns} />
      </div>
    )
  }
}