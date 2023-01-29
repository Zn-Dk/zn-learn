import { combineReducers } from "redux";
import count from "./count";

// 组合多种 reducers 输出一个统一 reducer
// 通过 store.[reducerName] 调用
export default combineReducers({
  count,
  //...
  //...
});
