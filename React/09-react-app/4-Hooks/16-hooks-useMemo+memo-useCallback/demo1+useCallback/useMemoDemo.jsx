import React, { useEffect, useMemo, useState } from 'react';

/*
  useMemo（参数1，参数2）
    参数1：是一个创建依赖项函数，该函数的返回值就是你想要缓存的数据，形式像useEffect, 实际上两者却存在着很多差异
    参数2：这个是个数组，存放着被依赖的项，意思就是说只有当这个数组里面的变量发生了变化，才会调用参数1的函数，这里同样跟useEffect很像，都是依赖项变了，才会调用前面的参数1的函数

  - 说明
    - useMemo 是做缓存用的，只有当一个依赖项改变的时候才会发生变化，否则拿缓存的值，就不用在每次渲染的时候再做计算
    - 如果你之前对 useEffect 有了解的话，知道它可看成 class 组件里面的 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
    - useMemo 则可以看作是 componentWillUpdate 函数，顺序大致为： useMemo -> render -> useEffect
    - ** 完全可以看做是 Vue 的计算属性功能 (定位类似, 随着某个变量的改变而改变) **
  */

const useMemoDemoApp = () => {
  return (
    <div>
      <h1>useMemoDemo</h1>
      <hr />
      <UseMemoDemo1 />
      <hr />
      <UseMemoDemo2 />
    </div>
  );
};

export const UseMemoDemo1 = () => {
  const [name, setName] = useState('Jack');
  const [val, setVal] = useState('I LV U');

  const memoWord = useMemo(() => {
    console.log('memoWord run');
    return val + ' ' + name; // 可以看到没有添加 name 作为依赖的时候这个 memoWord 是不改变的
  }, [val]);
  // 这里 React 也在提示你是否缺少了 name 这个依赖项，
  // 如果 name 不是依赖项，没有必要在 useMemo 里拼接它

  return (
    <div>
      <h2>Demo1. 基本使用</h2>
      <div>
        <label htmlFor="name">name</label>
        <input name="name" type="text" onChange={e => setName(e.target.value)} value={name} />
      </div>
      <div>
        <label htmlFor="val">val</label>
        <input name="val" type="text" onChange={e => setVal(e.target.value)} value={val} />
      </div>
      <p>Computed memo: {memoWord} </p>
    </div>
  );
};

const CONST_Y = 100;
const UseMemoDemo2 = () => {
  const [count, setCount] = useState(0);
  const [x, setX] = useState(100);

  // 使用 useMemo 也可以直接缓存一个组件 方法和 React.memo 一样
  // 与 memo 不同的是， 使用时不能直接写成标签，而是要写成 jsx 变量
  const complexCompMemo = useMemo(() => <ComplexCalcComp x={x} y={CONST_Y} />, [x]);

  // 假定需求是 count 为 10 的倍数时才更新 x
  const addCount = () => {
    setCount(p => p + 1);

    if (count > 0 && (count + 1) % 10 === 0) {
      setX(p => p + count);
    }
  };

  return (
    <div>
      <h2>
        Demo2. 假定 ComplexCalcComp 组件计算时间 3s，如果不缓存, count 每次改变
        都会导致页面重新渲染,十分影响体验
      </h2>
      {complexCompMemo}
      <h3>
        Count: {count} <button onClick={addCount}>+</button>
      </h3>
      <h4>Count 为 10 的倍数时,更新上面的计算组件</h4>
    </div>
  );
};

const ComplexCalcComp = ({ x, y }) => {
  console.log('Complex Calculating...');
  const getComplexResult = () => {
    const t = Date.now();
    while (true) {
      if (Date.now() - t > 3000) {
        return x + y;
      }
    }
  };

  return (
    <div style={{ border: '1px solid', padding: '30px' }}>
      <h3>ComplexCalcComp 计算组件</h3>
      <div>result: {getComplexResult()}</div>
    </div>
  );
};

export default useMemoDemoApp;
