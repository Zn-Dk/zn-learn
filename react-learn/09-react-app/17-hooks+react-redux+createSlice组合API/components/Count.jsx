import {
  increment,
  decrement,
  incByAmount,
  asyncIncByAmount,
  countSelector,
} from "@/redux/slices/count";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// react-redux Hooks
// useSelector 用于读取状态
// useDispatch 用于执行动作
export default function Count(props) {
  // 读取状态

  // 方式一 (需要去除 state.value 层):
  const unwrapState = (state) => {
    const o = {};
    for (const key in state) {
      o[key] = state[key].value;
    }
    return o;
  };
  const state = unwrapState(useSelector((state) => state));
  console.log("allState: ", state);

  const name = state.person[0]?.name;

  // 方式二 通过 slices 导出一个 selector(但是不足之处是不好处理跨 state 获取状态)
  const count = useSelector(countSelector);
  console.log("state count: ", count);

  const [amount, setAmount] = useState("");

  // 建立 dispatch 钩子
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count is : {count}</h1>
      <button onClick={() => dispatch(increment())}> +1 </button>
      <button onClick={() => dispatch(decrement())}> -1 </button>
      <input
        type="number"
        placeholder="set increment amount here..."
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={() => dispatch(incByAmount(amount)) && setAmount("")}>
        increaseByAmount
      </button>
      <button onClick={() => dispatch(asyncIncByAmount(amount, 500))}>
        increaseByAmountAsync
      </button>
      <h2>
        {name
          ? `Welcome! Our new friend : ${name}`
          : "Waiting for new friends to come..."}
      </h2>
    </div>
  );
}
