import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
// import axios from 'axios'
import './index.scss'

export default class App extends Component<RouteComponentProps<{},{}>>{
  componentDidMount(){
    // use axios here
  }
  render(){
    return (
      <div className="app">
        Hello html
      </div>
    )
  }
}