/**
 * preState 在初始化时会执行该 reducer为 undefined
 * 使用 initValue 赋予需要维持变量的默认值 / switch default 内返回默认值
 */

const initValue = 0; // 可以是任何类型
// eslint-disable-next-line import/no-anonymous-default-export
export default (preState = initValue, { type, payload }) => {
  console.log("Reducder running: ", preState, type, payload);
  // type 即判断 action 类型
  switch (type) {
    case "increase":
      return preState + payload * 1;
    case "decrease":
      return preState - payload * 1;
    case "multiply":
      return preState * payload;
    // 无 type (初始化使用)
    default:
      return preState;
  }
};
