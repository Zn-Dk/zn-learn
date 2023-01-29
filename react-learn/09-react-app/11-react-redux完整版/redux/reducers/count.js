/**
 * preState 在初始化时会执行该 reducer为 undefined
 * 使用 initValue 赋予需要维持变量的默认值 / switch default 内返回默认值
 */
import { INCREASE, DECREASE, MULTIPLY } from "../constant";

// 定义当前 state 的初始值, 可以是任何类型 e.g. object
const initValue = 0;

// eslint-disable-next-line import/no-anonymous-default-export
export default (preState = initValue, { type, payload }) => {
  console.log("Count Reducer running: ", preState, type, payload);

  // reducer 必须是一个纯函数
  // 因此对于引用类型 必须返回一个新引用对象/数组, 否则 diff 算法不认为是一种改变
  // 即 arr = [1]; arr.push(2); return arr; 是无效的
  // return [...arr, 2]; 则是有效的
  switch (type) {
    // 判断 action 类型
    case INCREASE:
      return preState + payload * 1;
    case DECREASE:
      return preState - payload * 1;
    case MULTIPLY:
      return preState * payload;
    // 无 type (初始化使用)
    default:
      return preState;
  }
};
