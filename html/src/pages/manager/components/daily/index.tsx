import React, { Component } from 'react'
import client from '../../../../client'
import './index.scss'
import Util from '../../../../util'
import { Table, Tag, Form, Select, DatePicker, notification, Radio, LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import moment from 'moment'
const { MonthPicker, RangePicker } = DatePicker
const Option = Select.Option
const FormItem = Form.Item
const RadioGroup = Radio.Group

interface IProps {
  history?: any
}

interface Istate {
  orderDate: any,
  department: string | number | undefined,
  total: string | number,
  dataSource: any,
  managerList: any,
  mode: any,
  inDay: any,
  inMonth: any,
  inRange: any
}

/** 返回状态的中文 */
function generateStatusName(status: number) {
  let text = ''
  switch (status) {
    case 1:
      text = '加班订餐'
      break
    case 2:
      text = '加班不订餐'
      break
    case 3:
      text = '不加班不订餐'
      break
  }
  return text
}
export default class Daily extends Component<IProps, Istate> {
  constructor(props) {
    super(props)
    this.state = {
      orderDate: '',
      department: '',
      total: '',
      dataSource: [],
      managerList: [],
      mode: 'date',
      inDay: moment(new Date(), 'yyyy-MM-dd'),
      inMonth: moment(new Date(), 'yyyy-MM'),
      inRange: [moment(new Date(), 'yyyy-MM-dd'), moment(new Date(), 'yyyy-MM-dd')]
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
    } else if (mode === 'section') {
      orderDate = [new Date().Format('yyyy-MM-dd'), new Date().Format('yyyy-MM-dd')]
    }
    this.setState({ mode, orderDate }, () => {
      this.getList().catch()
    })
  }

  getList = async () => {
    const orderDate = this.state.orderDate
    const department = this.state.department
    let ajaxURL = 'manager/getStatusList'
    let managerListURL = 'manager/getList'
    let dateParam = ''
    if (orderDate) {
      dateParam = typeof orderDate === 'string' ? `orderDate=${orderDate}` : `startDate=${new Date(orderDate[0] + ' 0:0:0').getTime()}&endDate=${new Date(orderDate[1]+' 23:59:59').getTime()}`
    }
    if (typeof department === 'number' && orderDate) {
      ajaxURL += `?department=${department}&${dateParam}`
      managerListURL += `?department=${department}&${dateParam}`
    } else if (typeof department !== 'undefined' && department !== '') {
      ajaxURL += `?department=${department}`
      managerListURL += `?department=${department}`
    } else if (orderDate) {
      ajaxURL += `?${dateParam}`
      managerListURL += `?${dateParam}`
    } else {
      notification.error({
        message: '嘿',
        description: '部门和日期两个不能同时为空'
      })
      return
    }

    const res = await client.get(ajaxURL)
    const listRes = await client.get(managerListURL)
    const data = res.data.data
    const managerList = (listRes && listRes.data && listRes.data.data) || []
    if(data) {
      data.map((item, index) => {
        item.key = index
      })
    }
    const dataSource = data
    this.setState({
      dataSource,
      managerList
    })
  }

  /** 时间选择改变: 进行搜索请求列表 */
  handleDatePickerOnChange = (date: any, orderDate: string) => {
    this.setState({ orderDate }, () => {
      this.getList().catch()
    })
  }
  // 区间选择
  private handleRangePickerOnChange = (dates: any, orderDate: [string, string]) => {
    this.setState({
      orderDate
    }, () => {
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
  private exportCsv = (orderStatus: number) => {
    const { managerList, orderDate, department } = this.state
    let csvStr = `姓名,提交时间,部门,备注,是否订餐\n`
    for(let i = 0 ; i < managerList.length ; i++ ){
      if (managerList[i] && managerList[i].orderStatus && +managerList[i].orderStatus === +orderStatus) {
        csvStr+=`${managerList[i]['name'] + '\t'},`
        csvStr+=`${new Date(managerList[i]['orderTime']).Format('yyyy-MM-dd hh:mm') + '\t'},`
        csvStr+=`${Util.getDeptNameFromNum(managerList[i]['department']) + '\t'},`
        csvStr+=`${managerList[i]['remarks'] + '\t'},`
        csvStr+=`${generateStatusName(managerList[i]['orderStatus']) + '\t'},`
        csvStr+='\n'
      }
    }
    // encodeURIComponent解决中文乱码
    const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(csvStr)
    // 通过创建a标签实现
    const link = document.createElement('a')
    link.href = uri
    // 对下载的文件命名
    link.download =  `${typeof department === 'number' ? Util.getDeptNameFromNum(department) : '全部部门'}${Object.prototype.toString.call(orderDate) === '[object Array]' ? orderDate.join('到') : orderDate}${generateStatusName(orderStatus)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
    }, {
      title: '操作',
      key: 'action',
      render: ({orderStatus}:{orderStatus: number}) => {
        return <a href="javascript:;" onClick={() => this.exportCsv(orderStatus)}>导出</a>
      }
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
                : this.state.mode === 'month' ?
                  <MonthPicker defaultValue={this.state.inMonth} onChange={this.handleDatePickerOnChange}/>
                  : <RangePicker defaultValue={this.state.inRange} onChange={this.handleRangePickerOnChange} />
              }
            </LocaleProvider>
          </FormItem>
          <FormItem>
          <RadioGroup onChange={this.handleRadioChange} value={this.state.mode}>
            <Radio value="date">按天</Radio>
            <Radio value="month">按月</Radio>
            <Radio value="section">按区间</Radio>
          </RadioGroup>
          </FormItem>
        </Form>

        <Table dataSource={this.state.dataSource} columns={columns} rowKey="key" />
      </div>
    )
  }
}
