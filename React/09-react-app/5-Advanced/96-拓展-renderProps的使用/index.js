import React, { StrictMode } from "react";
// 旧写法
// import { render } from "react-dom";

// React 18 新写法
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
const root = createRoot(container);
// 2. 调用 render 方法并传入 APP 组件
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
