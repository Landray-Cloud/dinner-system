import React, { Component } from 'react'
// import client from '../../client'
// import Util from '../../util'
import './index.scss'

interface IProps {
  [k: string]: any
}

interface Istate {
}

export default class SiderDemo extends Component<IProps, Istate> {
  state = {}

  render() {
    return (
      <div>设置开关</div>
    )
  }
}