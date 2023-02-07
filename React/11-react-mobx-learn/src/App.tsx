import React, { FC, useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";

type Props = {
  children?: JSX.Element;
  counterStore?: any;
  listStore?: any;
  [defaultParam: string]: any;
};

// 3. 进行操作
const App: FC = ({ counterStore, listStore }: Props) => {
  return (
    <div>
      <p>Count is : {counterStore.count}</p>
      <p>formattedCount : {counterStore.formattedCount}</p>
      <button onClick={counterStore.increment}>increment</button>
      <button onClick={() => counterStore.asyncIncrement(1000)}>
        asyncIncrement
      </button>
      <button onClick={counterStore.reset}>reset</button>
      <hr />
      <ListView list={listStore} />
    </div>
  );
};

// 对于子组件 也需要通过 observer 包装
import type { IData } from "./store/List";
const ListView: FC = observer(({ list }) => {
  return (
    <div>
      <h2>List</h2>
      <button onClick={(e) => list.fetch()}>FetchList</button>
      <button onClick={() => list.reset()}>reset</button>
      <ul>
        {list.data.map(({ completed, id, title, counter }: IData) => {
          return (
            <li key={id}>
              <p>Title: {title}</p>
              <p>id: {id}</p>
              <p>completed: {"" + completed}</p>
              <p>counterStore 的 counter: {counter}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

// 4. 组件中使用 mobx-react-lite 中的 observer 让mobx与react进行关联
export default observer(App);
