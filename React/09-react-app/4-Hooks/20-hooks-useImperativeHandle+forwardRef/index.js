// 旧写法
// import React, { StrictMode } from "react";
// import { render } from "react-dom";

// React 18 新写法 (不需要引入 React 本体)
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.querySelector("#root");

// 旧写法
// render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
//   container
// );

// 新写法
// 1. 包裹 dom 元素 返回一个 root 对象
// 2. 调用 render 方法并传入 APP 组件
createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
