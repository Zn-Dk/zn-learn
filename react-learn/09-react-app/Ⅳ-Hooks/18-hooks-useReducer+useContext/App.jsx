import React, { useContext, useReducer } from "react";
import { createContext } from "react";

// react 借鉴了 redux 思想后推出了 useReducer Hooks
// 方便用户自定义 维护一个轻量级别的 store

// 一般来说 会结合 Context 在 App 下 Provider 透传 (redux 也是如此)

// ACTIONS CONSTANT
const ACTIONS = {
  changeFoo: "changeFoo",
  addItem: "addItem",
  removeItem: "removeItem",
};

// initState
const initState = {
  foo: "foo",
  list: [],
};

// reducers
const reducer = (state, { type, payload }) => {
  const preList = [...state.list];
  switch (type) {
    case ACTIONS.changeFoo:
      return {
        ...state,
        foo: payload,
      };
    case ACTIONS.addItem:
      return {
        ...state,
        list: [payload, ...preList],
      };
    case ACTIONS.removeItem:
      preList.splice(payload, 1);
      return {
        ...state,
        list: preList,
      };
    default:
      return state;
  }
};

// 创建全局 context
const GlobalContext = createContext();

export default function App() {
  const [state, dispatch] = useReducer(reducer, initState);

  console.log(state);

  return (
    <div>
      <h1>App 组件</h1>
      <hr />
      {/* 分发 state dispatch */}
      <GlobalContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <Child1 />
        <hr />
        <Child2 />
        <hr />
        <View />
      </GlobalContext.Provider>
    </div>
  );
}

function Child1() {
  const { dispatch } = useContext(GlobalContext);
  const [text, setText] = React.useState("");
  return (
    <div>
      <h2>Child1 组件</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => dispatch({ type: ACTIONS.changeFoo, payload: text })}
      >
        changeFoo
      </button>
    </div>
  );
}

function Child2() {
  const { dispatch } = useContext(GlobalContext);
  const [text, setText] = React.useState("");
  return (
    <div>
      <h2>Child2 组件</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => dispatch({ type: ACTIONS.addItem, payload: text })}
      >
        addItem
      </button>
    </div>
  );
}

function View() {
  const {
    state: { foo, list },
    dispatch,
  } = useContext(GlobalContext);
  return (
    <div>
      <h2>View 组件</h2>
      <h3>foo 的值 : {foo}</h3>
      <div>
        <h3>List 列表:</h3>
        <ul>
          {list.length ? (
            list.map((item, idx) => {
              return (
                <li key={idx}>
                  item: {item}
                  <button
                    onClick={() =>
                      dispatch({ type: ACTIONS.removeItem, payload: idx })
                    }
                  >
                    REMOVE
                  </button>
                </li>
              );
            })
          ) : (
            <li>空空如也</li>
          )}
        </ul>
      </div>
    </div>
  );
}
