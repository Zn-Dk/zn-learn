import React, { Component } from "react";
import { NavLink, Route, Redirect } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";
export default class App extends Component {
  render() {
    return (
      <div>
        <h1>react-router-dom 匹配原则 exact | 重定向 Redirect</h1>
        <div className="wrap">
          <ul>
            <NavLink
              activeClassName="active foo"
              to="/about/foo"
            >
              <li>About</li>
            </NavLink>
            <NavLink
              activeClassName="active"
              to="/home/foo"
            >
              <li>Home</li>
            </NavLink>
          </ul>
          <div>
            {/*
              exact 控制模糊和精确匹配路径
              默认为模糊  即 Route 匹配 /path/*
              **一般情况下如果页面展示没有问题 不必开启(可能会导致二级路由失效)**
            */}
            <Route
              exact
              path="/about"
              component={About}
            ></Route>
            <Route
              path="/home"
              component={Home}
            ></Route>
            {/*
              路由重定向
              RouterV5 的写法: 引入 router Redirect to='path'
              RouterV6 的写法:
              <Route path="*" element={<Navigate to="/home" />}></Route>
            */}
            <Redirect to="/home" />
          </div>
        </div>
      </div>
    );
  }
}
