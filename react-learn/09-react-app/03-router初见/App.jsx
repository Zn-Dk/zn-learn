import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
export default class App extends Component {
  render() {
    return (
      <div>
        <h1>react-router-dom 测试</h1>
        {/* <Link to="/about"> => <a href="/about"></a> | 必备属性: to="路径" */}
        {/* Route => component 组件渲染 | 必备属性: path="与Link同路径" , component={ 组件名 } */}
        <div className="wrap">
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
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
