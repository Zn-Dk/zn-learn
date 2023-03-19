import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './00-styled-component-基本使用';
// import App from './01-styled-component-props';
// import App from './02-styled-component-包装组件';

const container = document.querySelector('#root');

// 新写法
// 1. 包裹 dom 元素 返回一个 root 对象
// 2. 调用 render 方法并传入 APP 组件
createRoot(container).render(<App />);
