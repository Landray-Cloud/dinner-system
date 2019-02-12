import React, { Component } from 'react'
import client from '../../../../client'
import Util from '../../../../util'
import './index.scss'
import AddOrder from '../../components/order/index'

import { Input, DatePicker, Table, Divider, Tag, notification, Form, Select, Popconfirm, Modal } from 'antd'
import moment from 'moment'
const Search = Input.Search
const Option = Select.Option
const FormItem = Form.Item

const dateFormat = 'yyyy-MM-dd'

interface IProps {
  [k: string]: any,
  history?: any
}

interface Istate {
  name: string,
  orderDate: string,
  department: string | number,
  dataSource: any,
  visible: boolean,
  formRecord: object
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
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      orderDate: '',
      department: '',
      dataSource: [],
      visible: false,
      formRecord: {}
    }
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

    if (typeof department !== 'undefined' && department !== '') {
      ajaxURL += `&department=${department}`
    }

    const res = await client.get(ajaxURL)
    const dataSource = res.data.data
    this.setState({ dataSource })
  }

  /** 按下搜索按钮: 进行搜索请求列表 */
  handleSearchOnSublimt = (name: string) => {
    // console.log('handleSearchOnSublimt', name)
    this.setState({ name }, () => {
      this.getList().catch()
    })
  }

  /** 时间选择改变: 进行搜索请求列表 */
  handleDatePickerOnChange = (date: any, orderDate: string) => {
    // console.log('handleDatePickerOnChange', date)
    this.setState({ orderDate }, () => {
      this.getList().catch()
    })
  }

  /** 部门选择改变: 进行搜索请求列表 */
  handleDeptChange = (department) => {
    // console.log('department', department)
    this.setState({ department }, () => {
      this.getList().catch()
    })
  }

  /** 删除当前行 */
  handleDeleteData = async (record) => {
    const postData = {
      id: record
    }
    const res = await client.post('manager/deleteOrder', postData)
    if (!res) return
    const code = res.data.errcode
    if(code === 0) {
      notification.success({
        message: 'Great',
        description: '删除成功了哦'
      })
      this.getList().catch()
    }
  }
  
  editModal = (record) => {
    this.setState({
      visible: true,
      formRecord: record
    })
  }
  handleEditCancel = (e) => {
    this.setState({
      visible: false
    })
  }

  handleEditOk = (e) => {
    this.setState({
      visible: false
    }, this.getList)
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
          <a onClick={() => this.editModal(record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm placement="topRight" onConfirm={() => this.handleDeleteData(record.id)} title="删除不可恢复，你确定要删除吗?" okText="Yes" cancelText="No">
            <a>删除</a>
          </Popconfirm>
        </span>
      )
    }]

    return (
      <div>
        <Form layout="inline">
          <FormItem label="部门">
            <Select className="table-select" allowClear={true} placeholder="请选择" onChange={this.handleDeptChange}>
              {this.generateOpts()}
            </Select>
          </FormItem>
          <FormItem label="提交日期">
            <DatePicker defaultValue={moment(new Date(), dateFormat)} onChange={this.handleDatePickerOnChange} />
          </FormItem>
          <FormItem>
            <Search
              placeholder="按名字搜索"
              onSearch={this.handleSearchOnSublimt}
              enterButton={true}
            />
          </FormItem>
        </Form>
        {/* 对于 dataSource 默认将每列数据的 key 属性作为唯一的标识。
        如果你的数据没有这个属性，务必使用 rowKey 来指定数据列的主键 */}
        <Table dataSource={this.state.dataSource} columns={columns} rowKey={record => record.id} />
        {/* 编辑的弹出框 */}
        {this.state.visible?<Modal 
          title="编辑订餐信息" 
          visible={this.state.visible}
          onCancel={this.handleEditCancel}
          className="editModal" >
          <AddOrder formRecord={this.state.formRecord} submitOk={this.handleEditOk} />
        </Modal>:null}
      </div>
    )
  }
}