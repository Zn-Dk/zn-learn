/**
 * 当应用规模越来越大时，建议使用单独的模块或文件来存放 action
 * 避免调用时因为 type 以及对传入的 payload 不确定所造成的问题
 * 因此 Action 创建函数 作为统一动作管理
 * 在组件中使用时导入函数 => store.dispatch(Action)
 */

import { INCREASE, DECREASE, MULTIPLY } from "../constant";

// 同步 Action 返回一般对象
export const increase = (payload) => ({ type: INCREASE, payload });

export const decrease = (payload) => ({ type: DECREASE, payload });

export const multiply = (payload) => ({ type: MULTIPLY, payload });

// 使用 redux-thunk 实现异步 Action
// 当 store.dispatch 接收的返回值是一个函数时
// 第一个传入的回调实参 dispatch === store.dispatch
export const incAsync = (payload, wait) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increase(payload));
    }, wait);
  };
};
