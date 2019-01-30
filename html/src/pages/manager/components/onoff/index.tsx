import React, { Component } from 'react'
import { Switch } from 'antd'
import client from '../../../../client'
import Util from '../../../../util'
import './index.scss'

interface IProps {
  [k: string]: any
}

interface Istate {
  defaultChecked: any,
  newDate: string,
  week: string
}

export default class SiderDemo extends Component<IProps, Istate> {
  constructor(props) {
    super(props)
    this.state = {
      defaultChecked: Boolean,
      newDate: Util.getDate(new Date(), 'yyyy-MM-dd'),
      week: Util.getWeek(new Date().getDay())
    }
  }
  onChange = (checked) => {
    console.log(checked)
  }
  componentDidMount() {
    client.get(`getSubmit?date=${this.state.newDate}`).then(res => {
      const status = res.data.data.status
      if(status === 1) {
        this.setState({
          defaultChecked: true
        })
      } else if(status === 0) {
        this.setState({
          defaultChecked: false
        })
      }
    })
  }
  render() {
    return (
      <div>
        <div className="orderSet">
          <p className="orderSet-p ">今天是{this.state.newDate}，{this.state.week}</p>
          <p className="updateSet">点餐状态：
          <Switch defaultChecked={this.state.defaultChecked} onChange={this.onChange} />
          </p>
        </div>
      </div>
    )
  }
}