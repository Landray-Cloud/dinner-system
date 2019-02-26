import React, { Component } from 'react'
import { Form, Input, Button, Select, notification } from 'antd'
import './index.scss'
import Util from '../../../../util'
import client from '../../../../client'

const Option = Select.Option
const FormItem = Form.Item

interface IProps {
  history?: any,
  formRecord?: any,
  form: any,
  submitOk?: any
}

interface IState {
}

class AddOrderForm extends Component<IProps, IState> {

  /** 生成部门待选项 */
  generateOpts = () => {
    return Util.deptTable.map((item) => <Option key={String(item.value)} value={item.value}>{item.label}</Option>)
  }

  /** 提交 */
  handleSubmit = (e) => {
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      e.preventDefault()
      if (!err) {
        let res
        if (this.props.formRecord && this.props.formRecord.id) {
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
          }
        }
      }
    })
  }
  /** 生成选项菜单 */
  // resGenerateOpts() {
  //   const opts = [
  //     '真功夫(快餐)',
  //     '永和豆浆(快餐)',
  //     '米多面多',
  //     '潮梅里卤鹅',
  //     '马来一号',
  //     '港岛记',
  //     '壹定食(快餐)',
  //     '吃个汤(椰子汤)',
  //     '金牌隆江猪脚烧腊(烧腊)',
  //     '起家一头牛',
  //     '盒悦',
  //     '红荔村肠粉'
  //   ]
  //   return opts.map((text, idx) => <Option key={String(idx)} value={text}>{text}</Option>)
  // }

  render() {
    const { getFieldDecorator } = this.props.form
    const { formRecord } = this.props
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 }
    }
    return (
      <div className="order-wrap">
        <Form className="order-form" layout="horizontal">
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
          {/* <FormItem label="餐厅" {...formItemLayout}>
            {
              getFieldDecorator('restaurant', {
                initialValue: formRecord ? formRecord.restaurant : '',
                rules: [{
                  required: true, message: '需要选择吃哪家哦'
                }]
              })(
                <Select placeholder="请选择">
                  {this.resGenerateOpts()}
                </Select>
              )
            }
          </FormItem> */}
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
            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>提交</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const AddOrder = Form.create()(AddOrderForm)
export default AddOrder