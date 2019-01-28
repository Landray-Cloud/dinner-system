import React, { Component } from 'react'
import client from '../../../../client'
// import Util from '../../../../util'
import './index.scss'
import { Input, DatePicker, Table, Divider, Tag, notification } from 'antd'
// import moment = require('moment')
const Search = Input.Search

interface IProps {
  [k: string]: any
}

interface Istate {
  name: string,
  orderDate: string,
  dataSource: any
}

export default class SiderDemo extends Component<IProps, Istate> {
  state = {
    name: '',
    orderDate: '',
    dataSource: []
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
    console.log('dataSource', dataSource)
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
        </span>
      ),
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;">Invite {record.name}</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
        </span>
      ),
    }]

    const dataSource = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    }]

    return (
      <div>
        <Search
          placeholder="按名字搜索"
          onSearch={this.handleSearchOnSublimt}
          enterButton={true}
        />
        <DatePicker onChange={this.handleDatePickerOnChange} />
        <Table dataSource={dataSource} columns={columns} />
      </div>
    )
  }
}