import React, { Component } from 'react'
import client from '../../../../client'
// import Util from '../../../../util'
import './index.scss'
import { Input, DatePicker, Table, Divider, Tag, notification } from 'antd'
import moment from 'moment'
const Search = Input.Search

const dateFormat = 'yyyy-MM-dd'

interface IProps {
  [k: string]: any
}

interface Istate {
  name: string,
  orderDate: string,
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

/** 返回部门的中文 */
function genrateDepartment(dept: number) {
  let text = ''
  switch (dept) {
    case 0:
      text = '用户体验部'
      break
    case 1:
      text = 'KM 产品部'
      break
    case 2:
      text = '蓝钉产品部'
      break
    case 3:
      text = '平台支持部'
      break
    case 4:
      text = 'EKP 产品部'
      break
    case 5:
      text = 'AIP 部门'
      break
  }
  return text
}

export default class SiderDemo extends Component<IProps, Istate> {
  state = {
    name: '',
    orderDate: '',
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
    if (!orderDate && !name) {
      notification.error({
        message: '嘿',
        description: '名字和日期两个不能同时为空'
      })
      return
    }
    let ajaxURL = 'manager/getList'
    if (name && orderDate) {
      ajaxURL += `?name=${name}&orderDate=${orderDate}`
    } else if (name) {
      ajaxURL += `?name=${name}`
    } else if (orderDate) {
      ajaxURL += `?orderDate=${orderDate}`
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
        <span>{genrateDepartment(department)}</span>
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
          <a href="javascript:;">编辑</a>
          <Divider type="vertical" />
          <a href="javascript:;">删除</a>
        </span>
      ),
    }]

    return (
      <div>
        <Search
          placeholder="按名字搜索"
          onSearch={this.handleSearchOnSublimt}
          enterButton={true}
        />
        <DatePicker defaultValue={moment(new Date(), dateFormat)} onChange={this.handleDatePickerOnChange} />
        <Table dataSource={this.state.dataSource} columns={columns} />
      </div>
    )
  }
}