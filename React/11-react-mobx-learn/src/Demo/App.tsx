import React, { FC, useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";

// 4. 导入相应的类型 定义接口
import ListStore from "../store/List";
import CounterStore from "../store/Counter";

interface ICounterStore {
  counterStore: CounterStore;
};
interface IListStore {
  listStore: ListStore;
};

// 5. 定义组件, 使用 Store
const App: FC<ICounterStore & IListStore> = ({ counterStore, listStore }) => {
  return (
    <div>
      <p>Count is : {counterStore.count}</p>
      <p>formattedCount : {counterStore.formattedCount}</p>
      <button onClick={()=>counterStore.increment()}>increment</button>
      <button onClick={() => counterStore.asyncIncrement(1000)}>
        asyncIncrement
      </button>
      <button onClick={()=>counterStore.reset()}>reset</button>
      <hr />
      <ListView listStore={listStore} />
    </div>
  );
};

// 7. 对于子组件 也需要通过 observer 包装
const ListView: FC<IListStore> = observer(({ listStore }) => {
  return (
    <div>
      <h2>List</h2>
      <button onClick={(e) => listStore.fetch()}>FetchlistStore</button>
      <button onClick={() => listStore.reset()}>reset</button>
      <ul>
        {listStore.data.map(({ completed, id, title, counter}) => {
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

// 6. 组件中使用 mobx-react-lite 中间件提供的 observer 方法包裹, 让 mobx 与 react 进行关联
export default observer(App);
