import React, { Component } from 'react'
import { Form, Input, Button, Select, notification, DatePicker } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import './index.scss'
import Util from '../../../../util'
import client from '../../../../client'
import moment from 'moment'
const Option = Select.Option
const FormItem = Form.Item

interface IProps {
  history?: any,
  formRecord?: any,
  form: any,
  submitOk?: any
}

interface IState {
  orderDate: string
}

class AddOrderForm extends Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      orderDate: new Date().Format('yyyy-MM-dd'),
    }
    if(this.props.formRecord) {
      const orderDate = this.props.formRecord.orderDate
      this.state = {
        orderDate
      }
    }
  }
  
  /** 生成部门待选项 */
  generateOpts = () => {
    return Util.deptTable.map((item) => <Option key={String(item.value)} value={item.value}>{item.label}</Option>)
  }
  /** 切换时间选择框 */
  handleDatePickerOnChange = (date: any,orderDate: string) => {
    setTimeout(() => {
      this.setState({
        orderDate: orderDate
      })
    })
  }
  /** 提交 */
  handleSubmit = (e) => {
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      e.preventDefault()
      if (!err) {
        values.d = this.state.orderDate
        values.t = new Date().getTime()
        let res
        if (this.props.formRecord && this.props.formRecord.id) {
          values.orderDate = this.state.orderDate
          res = await client.post('manager/updateDataById', { id: this.props.formRecord.id, ...values })
          const code = res.data.errcode
          if (code === 0) {
            notification.success({
              message: '很棒',
              description: '修改成功了哦'
            }),
              this.props.submitOk()
          }
        } else {
          res = await client.post('addOrder', values)
          const code = res.data.errcode
          if (code === 0) {
            notification.success({
              message: '很棒',
              description: '提交成功了哦'
            })
            // 提交成功后置空
            this.props.form.setFields({
              name: '',
              department: '',
              orderStatus: '',
              orderDate: ''
            })
          }
        }
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { formRecord } = this.props
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 }
    }
    return (
      <div className="orderwrap">
        <Form className="order-form" layout="horizontal" onSubmit={this.handleSubmit}>
          <FormItem label="姓名" {...formItemLayout}>
            {
              getFieldDecorator('name', {
                initialValue: formRecord ? formRecord.name : '',
                rules: [{
                  required: true, message: '需要输入姓名哦'
                }]
              })(
                <Input placeholder="请输入姓名" allowClear={true} />
              )
            }
          </FormItem>
          <FormItem label="部门" {...formItemLayout}>
            {
              getFieldDecorator('department', {
                initialValue: formRecord ? formRecord.department : '',
                rules: [{
                  required: true, message: '需要选择部门哦'
                }]
              })(
                <Select placeholder="请选择">
                  {this.generateOpts()}
                </Select>
              )
            }
          </FormItem>
          <FormItem label="订餐" {...formItemLayout}>
            {
              getFieldDecorator('orderStatus', {
                initialValue: formRecord ? formRecord.orderStatus : '',
                rules: [{
                  required: true, message: '需要选择订餐状态哦'
                }]
              })(
                <Select placeholder="请选择">
                  <Option value={1}>加班订餐</Option>
                  <Option value={2}>加班不订餐</Option>
                  <Option value={3}>不加班不订餐</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem label="时间" {...formItemLayout}>
            {/* {
              getFieldDecorator('orderDate', {
                initialValue: formRecord ? moment(formRecord.orderDate) : moment(new Date(), 'yyyy-MM-dd')
              })(
                <DatePicker 
                  className="orderdate" 
                  locale={locale}
                />
              )
            } */}
            <DatePicker 
              className="orderdate" 
              locale={locale}
              value={moment(this.state.orderDate)}
              onChange={this.handleDatePickerOnChange}
            />
          </FormItem>
          <FormItem label="备注" {...formItemLayout}>
            {
              getFieldDecorator('remarks', {
                initialValue: formRecord ? formRecord.remarks : '',
              })(
                <Input placeholder="因什么项目加班" allowClear={true} />
              )
            }
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const AddOrder = Form.create()(AddOrderForm)
export default AddOrder