import React, { Component } from "react";
import { NavLink, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>react-router-dom 嵌套路由+路由组件传参</h1>
        <div className="wrap">
          <ul>
            <NavLink
              activeClassName="active"
              to="/home"
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              activeClassName="active foo"
              to="/about"
            >
              <li>About</li>
            </NavLink>
          </ul>
          <div>
            {/*
                Switch 组件只会按顺序渲染第一个匹配的元素而不会匹配所有
                的路由 使用他以避免子路由产生的渲染冲突(比如Redirect)
                **注意** Switch 组件在 RouterV6 下 更名为 Routes
             */}
            <Switch>
              <Route
                exact
                path="/about"
                component={About}
              ></Route>
              <Route
                path="/home"
                component={Home}
              ></Route>
              <Redirect to="/home" />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
