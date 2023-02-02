// 通过 createSlice 一次性创建 reducer 和 actions 简化操作
// 源码实现: 通过整合 createReducer 和 createActions 一次性创建
import { createSlice } from "@reduxjs/toolkit";

// createSlice API => 生成状态切片
export const countSlice = createSlice({
  // 名称 决定了导出时取值 state.name.value
  name: "count",
  // 初始状态
  initialState: {
    value: 0,
  },
  reducers: {
    // 通过 state.value 取值
    // 注意这里不是返回值 而是直接对 state 进行操作
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incByAmount: (state, { payload, type }) => {
      // console.log(payload, type);
      // payload: dispatch 传入的值   type: 'count/incByAmount'
      state.value += payload * 1;
    },
  },
});

// 导出 actions (使用切片自动生成的 - 内部使用 createAction)
export const { increment, decrement, incByAmount } = countSlice.actions;

// 异步任务的创建方法
export const asyncIncByAmount =
  (amount, wait = 1000) =>
  (dispatch) => {
    setTimeout(() => {
      dispatch(incByAmount(amount));
    }, wait);
  };

// 导出 reducer
export default countSlice.reducer;

// 导出 selector 函数 去除 state.value 层
export const countSelector = (state) => state.count.value;
