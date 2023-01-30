import React, { memo, useEffect } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { useState } from "react";

/*
  useCallBack 搭配 React.memo 提高渲染性能

  React.memo
    - 如果你的子组件传入的props 不发生改变，memo 可以保证父组件改变时子组件不会重复渲染
    - 这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。以此通过记忆组件渲染结果的方式来提高组件的性能表现。

    React.memo 仅检查 props 变更。
    - 如果函数组件被 React.memo 包裹，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，
    - 当 state 或 context 发生变化时，它仍会重新渲染。
    ** 这就是为什么还需要搭配 useCallBack 来实现函数 props 复用 **

    使用 useCallback 当传入子组件的函数props不发生变化时 子组件复用旧函数

*/
export default function App() {
  const [count, setCount] = useState(0);
  const [foo, setFoo] = useState("foo");

  const fn = () => {
    console.log("function for Child");
  };

  // 使用useCallback时，第二参数为[]，
  // 外层组件每次更新时（暂时不考虑依赖）都会复用上次函数。
  // 子组件接收到传入props的 fn 没有变化，所以子组件不会发生更新。
  const wrapFn = useCallback(() => {
    console.log("function for Child");
  }, []);

  return (
    <div>
      <h2>App 组件</h2>
      <div>
        Count is : {count}{" "}
        <button onClick={() => setCount((c) => c + 1)}>+1</button>
      </div>
      <button onClick={() => setFoo((f) => (f === "foo" ? "bar" : "foo"))}>
        toggleFoo
      </button>
      <Child1 foo={foo} />
      <Child2 foo={foo} />
      <Child3 fn={fn} />
      <Child4
        fn={wrapFn}
        foo={foo}
      />
      <Child5 count={count} />
    </div>
  );
}

// 可以看到 Child1 中 props foo 没有改变 但是会随着父组件改变渲染
const Child1 = (props) => {
  useEffect(() => {
    console.log("Child1 渲染了", props);
  });
  return (
    <div>
      <h2>Child1 组件</h2>
    </div>
  );
};

// 没有函数属性 值不改变的情况下不会重复渲染
const Child2 = memo((props) => {
  useEffect(() => {
    console.log("Child2 渲染了", props);
  });
  return (
    <div>
      <h2>Child2 组件</h2>
    </div>
  );
});

const Child3 = memo((props) => {
  useEffect(() => {
    console.log("Child3 渲染了", props);
  });
  return (
    <div>
      <h2>Child3 组件</h2>
    </div>
  );
});

const Child4 = memo((props) => {
  useEffect(() => {
    console.log("Child4 渲染了", props);
  });
  return (
    <div>
      <h2>Child4 组件</h2>
    </div>
  );
});

// useMemo 是做缓存用的，只有当一个依赖项改变的时候才会发生变化，否则拿缓存的值，就不用在每次渲染的时候再做计算
// 如果你之前对useEffct有了解的话，知道它可看成class组件里面的componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
// 而useMemo则可以看作是componentWillUpdate函数，顺序大致为： useMemo -> render -> useEffect
const Child5 = (props) => {
  const { count } = props;
  const [val, setVal] = useState("I LV U");

  useEffect(() => {
    console.log("Child5 渲染了", props);
  });
  /*
    useMemo（参数1，参数2）

    参数1：是一个创建依赖项函数，该函数的返回值就是你想要缓存的数据，形式像useEffect, 实际上两者却存在着很多差异
    参数2：这个是个数组，存放着被依赖的项，意思就是说只有当这个数组里面的变量发生了变化，才会调用参数1的函数，这里同样跟useEffect很像，都是依赖项变了，才会调用前面的参数1的函数
  */
  const memoWord = useMemo(() => {
    console.log("memoWord run");
    return val + count; // 可以看到没有添加 count 作为依赖的时候这个 memoWord 是不改变的
  }, [val]);

  return (
    <div>
      <h2>Child5 组件</h2>
      <p>
        memoWord {memoWord}
        {/* 只有修改了 val 才触发更新 */}
        <button onClick={() => setVal("I NEED U")}>CHANGE MEMO</button>
      </p>
      <p>count {count}</p>
    </div>
  );
};
