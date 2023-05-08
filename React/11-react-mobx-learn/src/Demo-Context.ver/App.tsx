import React, { FC } from "react";
import { observer } from "mobx-react-lite";

import ListStore from "../store/List";
import rootStore, { useStore } from "../store";

interface IListStore {
  listStore: ListStore;
};

// 使用 useStore 直接得到定义的 store
const App: FC = () => {

  // 注意 解构赋值到 store 的实例对象就可以了，继续解构响应式会丢失
  const {listStore, counterStore}= useStore(rootStore)

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

export default observer(App);
