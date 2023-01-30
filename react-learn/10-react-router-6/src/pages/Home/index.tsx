import React, { Component } from 'react'
import './index.css'
import { NavLink, Route } from 'react-router-dom'
import News from './News'
import Shop from './Shop'

export default class Home extends Component {
  componentDidMount() {
    document.title = this.constructor.name
  }
  render() {
    return (
      <div>
        <p>Home 组件</p>
        {/*
          使用嵌套路由 只需要在嵌套层级下建立 NavLink-Route 关系即可
            注意  路由要将之前的路由路径全部匹配进来
        */}
        <div className="home-top">
          <NavLink to="/home/news">新闻</NavLink>
          <NavLink to="/home/shop">商品</NavLink>
        </div>
        <div className="home-view">
          {/* 使用 Switch 避免重定向冲突 */}
          <Switch>
            <Route path="/home/news" component={News} />
            <Route path="/home/shop" component={Shop} />
            <Redirect to="/home/news" />
          </Switch>
        </div>
      </div>
    )
  }
}
