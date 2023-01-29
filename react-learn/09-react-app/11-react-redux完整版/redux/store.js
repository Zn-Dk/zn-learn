/**
 * 创建 redux store 的步骤
 * 建立 reducer 用于处理 action => 多个 reducer 使用 combineReducers API 合并,并对应命名空间
 * 调用 createStore API 包裹 reducers 创建 store 并暴露
 * 如果需要中间件, 在 options 中使用 applyMiddleware (比如 redux-thunk 实现异步 Action)
 */

// import { createStore } from "@reduxjs/tookit"; 官网新版本
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";

// 第二个参数 enhancer 传入中间件
export default createStore(reducer, applyMiddleware(thunk));

/*
  如果要使用 开发者工具(redux 有专用浏览器拓展 react-dev-tool 不能监测):
  1. npm i @redux-devtools/extension 并安装浏览器拓展
  2. import { composeWithDevTools } from '@redux-devtools/extension';
  3. 修改 const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(...middleware)
      // other store enhancers if any
    )
  );
*/
