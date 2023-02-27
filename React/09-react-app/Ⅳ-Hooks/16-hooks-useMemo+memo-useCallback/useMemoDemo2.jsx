// 使用 useMemo 也可以直接缓存一个组件
// 特别是这个组件不需要实时状态变化 而且又耗费很多时间渲染的情况下
import React, { useMemo, useState } from "react";

const ComplexCalcComp = ({ x, y }) => {
  console.log("Complex Calculating...");
  const t = Date.now();
  const getComplexResult = () => {
    while (1) {
      if (Date.now() - t > 3000) {
        return x + y;
      }
    }
  };

  return <div>精细计算 - result: {getComplexResult()}</div>;
};

const y = 100;
const useMemoDemo2 = () => {
  const [count, setCount] = useState(0);
  const [x, setX] = useState(100);

  const complexComp = useMemo(
    () => (
      <ComplexCalcComp
        x={x}
        y={y}
      />
    ),
    [x]
  );

  // Count 为 10 的倍数时 更新 x
  const addCount = () => {
    if (count && count % 10 === 0) {
      setX((p) => p + count);
    }
    setCount((p) => p + 1);
  };

  return (
    <div>
      useMemoDemo2
      <hr />
      <h2>
        下面这个组件计算时间 3s ,如果不缓存,Count 每次加 1
        都会导致页面重新渲染,十分影响体验, 需要用 useMemo 缓存整个组件
      </h2>
      {complexComp}
      <hr />
      <h3>Count: {count}</h3>
      <h4>Count 为 10 的倍数时,更新上面的计算组件</h4>
      <button onClick={addCount}>Count++</button>
    </div>
  );
};

export default useMemoDemo2;
