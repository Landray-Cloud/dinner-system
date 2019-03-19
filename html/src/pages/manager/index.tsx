import React, { Component } from 'react'
import './index.scss'
import { Layout, Menu, Icon, Button, Modal } from 'antd'
import DinnerTable from './components/table'
import OnOff from './components/onoff'
import AddOrder from './components/order'
import Daily from './components/daily'
import Department from './components/department'
import DinnerManager from './components/dinnerManager'
// import { relative } from 'path';

const { Header, Sider, Content } = Layout
const confirm = Modal.confirm
interface IProps {
  [k: string]: any,
  history: any
}

interface Istate {
  collapsed: boolean,
  active: string
}

export default class SiderDemo extends Component<IProps, Istate> {
  constructor(props) {
    super(props)

    this.state = {
      collapsed: false,
      active: '1'
    }
    this.delCookie = this.delCookie.bind(this)
    this.exitLogin = this.exitLogin.bind(this)
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  /** 菜单点击 */
  handleMenuItemOnClick = (e: any) => {
    const active = e.key
    if (!active) return
    this.setState({ active })
  }

  /** 生产中间内容 */
  generateContent = () => {
    switch (this.state.active) {
      case '1':
        return <Daily />
      case '2':
        return <DinnerTable />
      case '3':
        return <Department />
      case '4':
        return <OnOff />
      case '5':
        return <AddOrder />
      case '6':
        return <DinnerManager />
    }
    return (
      <div>暂无...</div>
    )
  }
  /** 读取cookie */
  getCookie = (name) => {
    let arr
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2])
    } else {
      return null
    }

  }
  /** 删除cookie */
  delCookie(name) {
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const cval = this.getCookie(name)
    if (cval !== null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toUTCString() + ';Path=/'
    }
  }
  /** 退出登录 */
  exitLogin() {
    const _this = this
    confirm({
      title: '嘿',
      content: '确定要退出登录吗？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        _this.delCookie('Angelebaby')
        _this.props.history.push('/login')
      }
    })
  }

  render() {
    return (
      <Layout className="manager-layout">
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleMenuItemOnClick}>
            <Menu.Item key="1">
              <Icon type="smile" />
              <span>日常订餐</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="bar-chart" />
              <span>人员明细</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="line-chart" />
              <span>部门明细</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="poweroff" />
              <span>订餐开关</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="upload" />
              <span>添加数据</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="user" />
              <span>订餐管理员</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, position: 'relative' }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <Button type="primary" style={{ position: 'absolute', right: '40px', top: '16px' }} onClick={this.exitLogin}>退出登录</Button>
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            {this.generateContent()}
          </Content>
        </Layout>
      </Layout>
    )
  }
}