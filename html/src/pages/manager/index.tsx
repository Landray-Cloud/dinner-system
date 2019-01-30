import React, { Component } from 'react'
// import client from '../../client'
// import Util from '../../util'
import './index.scss'
import { Layout, Menu, Icon } from 'antd'
import DinnerTable from './components/table'
import OnOff from './components/onoff'

const { Header, Sider, Content } = Layout

interface IProps {
  [k: string]: any
}

interface Istate {
  collapsed: boolean,
  active: string
}

export default class SiderDemo extends Component<IProps, Istate> {
  state = {
    collapsed: !false,
    active: '1'
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
        return (
          <div>'开发中...'</div>
        )
    }
    return (
      <div>暂无...</div>
    )
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
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
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