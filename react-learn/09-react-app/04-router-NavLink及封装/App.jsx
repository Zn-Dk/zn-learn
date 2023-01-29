import React, { Component } from "react";
import { Link, NavLink, Route } from "react-router-dom";
import MyLink from "./components/MyLink";
import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";
export default class App extends Component {
  render() {
    return (
      <div>
        <h1>react-router-dom NavLink</h1>
        {/* NavLink 在激活时默认会为其标签添加 "active" 类名 */}
        {/*
            如果要修改 在 router@5 下 修改属性,
            <还可以指定 activeStyle={} >
            而在版本6新写法 className={({ isActive }) => "foobar " + (isActive ? "active" : "")}\
            即原有类名 + 回调参数 isActive 控制
        */}
        <div className="wrap">
          <ul>
            <NavLink
              activeClassName="active foo"
              to="/about"
            >
              <li>About</li>
            </NavLink>
            <NavLink
              // activeClassName="active"
              className={(isActive) => "bar " + (isActive ? "active" : "")}
              to="/home"
            >
              <li>Home</li>
            </NavLink>

            {/* 封装 NavLink 见组件说明 */}
            <MyLink
              to="/test"
              a={1}
              b={2}
              c={3}
            >
              <li>Test</li>
            </MyLink>
            <MyLink
              to="/bar"
              a={1}
              b={2}
              c={3}
            >
              <li>
                bar
                <button>OK</button>
              </li>
            </MyLink>
          </ul>
          <div>
            <Route
              path="/about"
              component={About}
            ></Route>
            <Route
              path="/home"
              component={Home}
            ></Route>
          </div>
        </div>
      </div>
    );
  }
}
