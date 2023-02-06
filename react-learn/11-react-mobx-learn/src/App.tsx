import React, { FC, useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
// 4.引入 store
import store from "./store";
import { autorun } from "mobx";

const App: FC = () => {
  const { counterStore } = store;
  return (
    <div>
      <p>Count is : {counterStore.count}</p>
      <button onClick={counterStore.increment}>increment</button>
      <button onClick={() => counterStore.asyncIncrement(1000)}>
        asyncIncrement
      </button>
      <button onClick={counterStore.reset}>reset</button>
    </div>
  );
};

// 3. 组件中使用 mobx-react-lite 中的 observer 让mobx与react进行关联
export default observer(App);
