import { configureStore } from "@reduxjs/toolkit";
import studentApi from "./studentApi";

const store = configureStore({
  reducer: {
    // 定义的名称 : 自动生成的 reducer
    [studentApi.reducerPath]: studentApi.reducer,
  },
  // 中间件 将 studentApi 自动生成的中间件合入中间件
  // middleware 接收 getDefaultMiddleware 回调 执行后返回当前注册的中间件列表
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware),
});

export default store;
