import React, { Component } from 'react'
import { Switch, notification } from 'antd'
import client from '../../../../client'
import './index.scss'

interface IProps {
  [k: string]: any
}

interface Istate {
  checked: any,
  week: string,
  today: string
}

export default class SiderDemo extends Component<IProps, Istate> {
  constructor(props) {
    super(props)
    this.state = {
      checked: '',
      week: new Date().Format('yyyy-MM-dd u'),
      today: new Date().Format('yyyy-MM-dd')
    }
  }

  // 修改当日点餐状态
  onSwitch = async (checked) => {
    this.setState({
      checked: checked
    })
    const status = checked ? 1 : 0
    const ajaxURL = 'manager/setSubmit'
    const ajaxDate = {
      status: status,
      data: this.state.today
    }
    await client.post(ajaxURL, ajaxDate)
    notification.success({
      message: '点餐状态修改成功',
    })
  }

  // 获取当日点餐状态
  _getSubmit = async () => {
    const res = await client.get(`getSubmit?date=${this.state.today}`)
    const _status = res.data.data.status
    this.setState({
      checked: Boolean(_status)
    })
  }

  componentDidMount() {
    this._getSubmit().catch()
  }
  
  render() {
    return (
      <div className="orderWrapper">
        <div className="orderSet">
          <p className="orderSet-p ">今天是{this.state.week}</p>
          <p className="updateSet">点餐状态：
          <Switch checked={this.state.checked} onChange={this.onSwitch} />
          </p>
        </div>
      </div>
    )
  }
}