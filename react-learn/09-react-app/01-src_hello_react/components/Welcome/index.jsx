import React, { Component } from 'react'
import './index.css'

export default class Welcome extends Component {
  render(){
    return (
      <h1 className='welcome'>{this.props.msg}</h1>
    )
  }
}