import { combineReducers } from "redux";
import count from "./count";
import person from "./person";

// 组合多种 reducers 输出一个统一 reducer
// 通过 store.[reducerName] 调用
export default combineReducers({
  //... 1.起别名 key: reducerName
  //... 2.ES6简化 reducerName
  count,
  person,
});
