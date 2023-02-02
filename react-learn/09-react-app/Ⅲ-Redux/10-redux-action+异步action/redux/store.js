/**
 * 创建 redux store 的步骤
 * 建立 reducer 用于处理 action
 * 调用 createStore API 包裹 reducers 创建 store 并暴露
 */

// import { createStore } from "@reduxjs/tookit"; 官网新版本
// applyMiddleware 使用中间件实现 redux 功能(比如 redux-thunk 实现异步 Action)
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducers";

// 第二个参数 enhancer 传入中间件
export default createStore(reducer, applyMiddleware(thunk));
