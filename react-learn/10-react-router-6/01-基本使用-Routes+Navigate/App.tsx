import React from "react";
// import { NavLink, Route, Switch, Redirect, } from "react-router-dom";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home";

export default function App() {
  return (
    <div>
      <h1>react-router-dom</h1>
      <div className="wrap">
        <ul>
          <NavLink to="/home">
            <li>Home</li>
          </NavLink>
          <NavLink to="/about">
            <li>About</li>
          </NavLink>
        </ul>
        <div>
          {/*
              Switch 组件在 RouterV6 下 更名为 Routes
              Routes 组件拥有与 Switch 同样的最优先匹配功能
              **而且 Route 组件现在必须被 Routes 包裹**
              Route 可嵌套使用 并可以使用 useRoutes() 配置路由表 但需要用 Outlet 组件渲染子路由
             */}
          <Routes>
            {/* <Route component={Comp}> => <Route element={<Comp/>}> */}
            {/* caseSensitive 属性决定是否区分大小写 */}
            <Route
              path="/about"
              element={<About />}
            ></Route>
            <Route
              path="/home"
              element={<Home />}
            ></Route>
            {/*
              取消了 Redirect 作为单独的重定向组件
              <Redirect to="/home" />
              取而代之的写法是 在 "/" 的匹配中传入 Navigate
              Navigate 组件一旦被渲染出来就会引起整体视图的重新跳转
            */}
            <Route
              path="/"
              element={<Navigate to={"/home"} />}
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
