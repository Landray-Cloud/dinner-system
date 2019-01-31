import React, { Component } from 'react'
import { Form, Input, Button, Select, notification } from 'antd'
import './index.scss'

const Option = Select.Option
const FormItem = Form.Item

interface IProps {
  history: any
}

class AddOrder extends Component<IProps> {
  constructor(props) {
    super(props)
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
            <Input placeholder="请输入姓名" allowClear={true} />
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