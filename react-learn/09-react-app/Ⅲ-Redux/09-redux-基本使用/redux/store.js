/**
 * 创建 redux store 的步骤
 * 建立 reducer 用于处理 action
 * 调用 createStore API 包裹 reducers 创建 store 并暴露
 */

// import { createStore } from "@reduxjs/tookit"; 官网示例新版本
import { createStore } from "redux";

import reducer from "./reducers";

export default createStore(reducer);
