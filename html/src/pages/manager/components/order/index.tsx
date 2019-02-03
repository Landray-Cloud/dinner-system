import React, { Component } from 'react'
import { Form, Input, Button, Select, notification } from 'antd'
import './index.scss'
import Util from '../../../../util'
import client from '../../../../client'

const Option = Select.Option
const FormItem = Form.Item

interface IProps {
  history?: any
}

interface IState {
  name: string,
  department: string,
  orderStatus: string,
  remarks: string,
  form: {
    [k: string]: string | number
  }
}

class AddOrder extends Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      department: '',
      orderStatus: '',
      remarks: '',
      form: {
        name: '',
        department: '',
        orderStatus: 0,
        remarks: '',
      }
    }
  }
  /* 姓名 */
  handleNameChange = (e) => {
    const name = e.target.value
    const form = Object.assign({}, this.state.form, { name })
    this.setState({ form })
  }
  /* 部门 */
  handleDeptChange = (department) => {
    const form = Object.assign({}, this.state.form, { department })
    this.setState({ form })
  }
  /* 加班 */
  handleOrderStatusChange = (orderStatus) => {
    const form = Object.assign({}, this.state.form, { orderStatus })
    this.setState({ form })
  }
  /* 备注 */
  handleRemarksChange = (e) => {
    const remarks = e.target.value
    const form = Object.assign({}, this.state.form, { remarks })
    this.setState({ form })
  }

  /** 生成部门待选项 */
  generateOpts = () => {
    return Util.deptTable.map((item) => <Option key={String(item.value)} value={item.value}>{item.label}</Option>)
  }
  /** 检查表单 */
  checkForm() {
    const form = this.state.form

    if (!form.name) {
      notification.error({
        message: '嘿',
        description: '需要写上员工姓名哦'
      })
      return false
    }
    
    if (!form.department) {
      notification.error({
        message: '嘿',
        description: '需要选择所属部门哦'
      })
      return false
    }

    if (!form.orderStatus) {
      notification.error({
        message: '嘿',
        description: '需要选择订餐状态哦'
      })
      return false
    }

    return true
  }

  /** 提交 */
  handleSubmit = async (e) => {
    e.preventDefault()
    if (!this.checkForm()) return
    const postData = this.state.form
    const res = await client.post('addOrder', postData)
    if (!res) return
    const code = res.data.errcode
    if(code === 0) {
      notification.success({
        message: '很棒',
        description: '提交成功了哦'
      })
    }
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 }
    }
    return (
      <div className="order-wrap">
        <Form className="order-form" layout="horizontal">
          <FormItem label="姓名" {...formItemLayout}>
            <Input placeholder="请输入姓名" allowClear={true} onChange={this.handleNameChange}/>
          </FormItem>
          <FormItem label="部门" {...formItemLayout}>
            <Select placeholder="请选择"  onChange={this.handleDeptChange}>
              {this.generateOpts()}
            </Select>
          </FormItem>
          <FormItem label="订餐" {...formItemLayout}>
            <Select placeholder="请选择" onChange={this.handleOrderStatusChange}>
              <Option value={1}>加班订餐</Option>
              <Option value={2}>加班不订餐</Option>
              <Option value={3}>不加班不订餐</Option>
            </Select>
          </FormItem>
          <FormItem label="备注" {...formItemLayout}>
            <Input placeholder="因什么项目加班" allowClear={true}  onChange={this.handleRemarksChange}/>
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>提交</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
export default AddOrder