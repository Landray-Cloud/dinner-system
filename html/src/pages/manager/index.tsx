import React, { Component } from 'react'
// import client from '../../client'
// import Util from '../../util'
import './index.scss'
import { Layout, Menu, Icon, Button, Modal } from 'antd'
import DinnerTable from './components/table'
import OnOff from './components/onoff'
import AddOrder from './components/order'
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
        return <DinnerTable />
      case '2':
        return <OnOff />
      case '3':
        return <AddOrder />
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
              <Icon type="bar-chart" />
              <span>查看报表</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="poweroff" />
              <span>设置开关</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>添加数据</span>
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
            <Button type="primary" style={{position: 'absolute', right: '40px', top: '16px'}} onClick={this.exitLogin}>退出登录</Button>
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