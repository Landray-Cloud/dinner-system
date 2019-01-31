import React, { Component } from 'react'
import { Form, Input, Button, Select } from 'antd'
import './index.scss'

const Option = Select.Option
const FormItem = Form.Item

interface IProps {
  history: any
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
        orderStatus: 0, // 提交用
        remarks: ''
      }
    }
  }
  handleNameChange = (e) => {
    const remarks = e.target.value
    const form = Object.assign({}, this.state.form, { remarks })
    this.setState({ form })
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 }
    }
    return (
      <div className="form-warp">
        <Form className="order-form" layout="horizontal">
          <FormItem label="姓名" {...formItemLayout}>
            <Input placeholder="请输入姓名" allowClear={true} onChange={this.handleNameChange}/>
          </FormItem>
          <FormItem label="部门" {...formItemLayout}>
            <Select placeholder="请选择">
              <Option value={0}>用户体验部</Option>
              <Option value={1}>KM产品部</Option>
              <Option value={2}>蓝钉产品部</Option>
              <Option value={3}>平台支持部</Option>
              <Option value={4}>EKP产品部</Option>
              <Option value={5}>AIP部门</Option>
            </Select>
          </FormItem>
          <FormItem label="订餐" {...formItemLayout}>
            <Select placeholder="请选择">
              <Option value={1}>加班订餐</Option>
              <Option value={2}>加班不订餐</Option>
              <Option value={3}>不加班不订餐</Option>
            </Select>
          </FormItem>
          <FormItem label="备注" {...formItemLayout}>
            <Input placeholder="因什么项目加班" allowClear={true} />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
export default AddOrder