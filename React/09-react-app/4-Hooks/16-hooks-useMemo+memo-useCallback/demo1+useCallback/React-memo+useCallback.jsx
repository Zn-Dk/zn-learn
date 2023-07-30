import React, { memo, useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';

/*
  useCallBack 搭配 React.memo 提高渲染性能

  - React.memo
    - 如果你的子组件传入的 props 不发生改变，memo 可以保证父组件改变时子组件不会重复渲染
    - 这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。以此通过记忆组件渲染结果的方式来提高组件的性能表现。

    React.memo 仅检查 **props** 变更。
    - 如果函数组件被 React.memo 包裹，且其实现中拥有 useState，useReducer 或 useContext 的 Hook，
    - 当 state 或 context 发生变化时，它仍会重新渲染。
    ** 这就是为什么还需要搭配 useCallBack 来实现函数 props 复用 **


  - 使用 useCallback 当传入子组件的函数props不发生变化时 子组件复用旧函数
    - 如果已知道 useMemo 的功能和实现机理, 我们可以认为 useCallBack 在 React 内部的简化实现是如下的:
      function useCallback(fn, dependencies) {
        return useMemo(() => fn, dependencies);
      }
    - 两者有什么区别?
      useMemo 缓存函数调用的结果。
      useCallback 缓存函数本身。

*/
export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('foo');

  const handleName = () => {
    setName(prevName => (prevName === 'foo' ? 'bar' : 'foo'));
  };

  // 对照组 普通函数
  const fn = () => {
    console.log('function for Child');
  };

  // 使用 useCallback 缓存函数，第二参数为 []，不关联任何依赖
  // 外层组件每次更新时（暂时不考虑依赖）都会复用上次函数。
  // 子组件接收到传入props的 wrapFn 没有变化，所以子组件不会发生更新。
  const wrapFn = useCallback(() => {
    console.log('function for Child');
  }, []);

  return (
    <div>
      <h2>App 组件</h2>
      <div>
        Count is : {count} <button onClick={() => setCount(c => c + 1)}>+1</button>
      </div>
      <div>
        Name is : {name} <button onClick={handleName}>toggleName</button>
      </div>
      <Child1 name={name} />
      <Child2 name={name} />
      <Child3 fn={fn} />
      <Child4 fn={wrapFn} />
      <Child5 name={name} fn={wrapFn} />
    </div>
  );
}

// 演示步骤
// 1. 修改 count, 观察现象
// 2. 修改 name, 观察现象

// Case 1: 不使用 memo 缓存组件 | props 使用 name
// 步骤 1 - result: Child1 的 useEffect 运行
// - 虽然 Child1 只使用 name 属性, 但父组件发生改变, 会直接让父组件及所以子组件重新渲染
// 步骤 2 - result: Child1 的 useEffect 运行
// - 同步骤 1
const Child1 = props => {
  useEffect(() => {
    console.log('Child1 渲染了', props);
  });
  return (
    <div>
      <h2>Child1 组件 - 普通组件</h2>
    </div>
  );
};

// Case 2: 使用 React.memo 包裹组件 | props 使用 name
// 步骤 1 - result: NO LOG
// - name 属性值不改变的情况下不会重复渲染
// 步骤 2 - result: Child2 的 useEffect 运行
// - name 属性发生改变，正常触发重新渲染
const Child2 = memo(props => {
  useEffect(() => {
    console.log('Child2 渲染了', props);
  });
  return (
    <div>
      <h2>Child2 组件 - memo 组件使用 name</h2>
    </div>
  );
});

// Case 3: 使用 React.memo 包裹组件 | props 使用 fn
// 步骤 1 - result: Child3 的 useEffect 运行
// - 虽然 Child3 使用 memo , 但父组件发生改变重新渲染且 fn 未使用 useCallBack 进行包裹, 发生重新渲染
// 步骤 2 - result: Child3 的 useEffect 运行
// - 同步骤 1
const Child3 = memo(props => {
  useEffect(() => {
    console.log('Child3 渲染了', props);
  });
  return (
    <div>
      <h2>Child3 组件 - memo 组件使用 fn</h2>
    </div>
  );
});

// Case 4: 使用 React.memo 包裹组件 | props 使用 fn(useCallback)
// 步骤 1 - result: NO LOG
// - Child4 使用 memo 且属性 fn 使用 useCallBack 进行包裹, 即便父组件发生改变重新渲染, Child 不发生重新渲染
// 步骤 2 - result: Child5 的 useEffect 运行
// - name 发生改变, 重新渲染
const Child4 = memo(props => {
  useEffect(() => {
    console.log('Child4 渲染了', props);
  });
  return (
    <div>
      <h2>Child4 组件 - memo 组件使用 fn(useCallback)</h2>
    </div>
  );
});

// Case 5: 使用 React.memo 包裹组件 | props 使用 name + fn(useCallback)
// 步骤 1 - result: NO LOG
// - 同 Child 4
// 步骤 2 - result: NO LOG
// - 同步骤 1
const Child5 = memo(props => {
  useEffect(() => {
    console.log('Child5 渲染了', props);
  });
  return (
    <div>
      <h2>Child4 组件 - memo 组件使用 name + fn(useCallback)</h2>
    </div>
  );
});
