import React from "react";
import App from "../Ⅵ-Demos/Demo-旋转Loading/App";

// 旧写法
// import { render } from "react-dom";
// render(<App />, container);

// React 18 新写法
import { createRoot } from "react-dom/client";

const container = document.querySelector("#root");

// 新写法
// 1. 包裹 dom 元素 返回一个 root 对象
// 2. 调用 render 方法并传入 APP 组件
createRoot(container).render(<App />);
