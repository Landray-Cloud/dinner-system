import React, { Component } from 'react'
import { Input, Button, notification } from 'antd'
import client from '../../../../client'
import './index.scss'
import Util from '../../../../util'

interface IProps {
  [k: string]: any
}

interface Istate {
  dinnerManager: string,
  week: string,
  today: string
}

export default class SiderDemo extends Component<IProps, Istate> {
  constructor(props) {
    super(props)
    this.state = {
      dinnerManager: '',
      week: new Date().Format('yyyy-MM-dd u'),
      today: new Date().Format('yyyy-MM-dd')
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  // 修改当日点餐状态
  onSave = async () => {
    const dinnerManager = this.state.dinnerManager
    this.setState({ dinnerManager })
    const postData = { name: dinnerManager }
    const res = await client.post(`manager/setDinnerManager`, postData)
    const code = res.data.errcode
    if (code === 0) {
      notification.success({
        message: '订餐管理员名字修改成功',
      })
    }
  }

  /** 获取订餐负责人名字 */
  getDinnerManager = async () => {
    let dinnerManager = await Util.getDinnerManager()
    if (!dinnerManager || dinnerManager === '') dinnerManager = '订餐负责人'
    this.setState({ dinnerManager })
  }

  // 输入框赋值
  handleInputChange(e) {
    const dinnerManager = e.target.value
    this.setState({ dinnerManager })
  }

  componentDidMount() {
    this.getDinnerManager().catch()
  }

  render() {
    return (
      <div className="orderWrapper">
        <div className="orderSet">
          <p className="orderSet-p ">今天是{this.state.week}</p>
          <div className="dinnerManagerSet">
            <span>当前订餐管理员：</span>
            <Input placeholder="订餐负责人" value={this.state.dinnerManager} onChange={this.handleInputChange} />
            <Button type="primary" onClick={this.onSave}>保存</Button>
          </div>
        </div>
      </div>
    )
  }
}