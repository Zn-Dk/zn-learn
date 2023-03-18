import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

const container = document.querySelector('#root');

// 新写法
// 1. 包裹 dom 元素 返回一个 root 对象
// 2. 调用 render 方法并传入 APP 组件
createRoot(container).render(<App />);
