import React, { useMemo, useState } from 'react';

let rerenderCount = 0;
const ExpensiveComp = () => {
  const t = Date.now();
  while (true) {
    if (Date.now() - t > 1000) {
      rerenderCount++;
      break;
    }
  }

  console.log('rerender');
  return (
    <div style={{ border: '1px solid', padding: '30px' }}>
      <h3>ExpensiveComp</h3>
      <h4>Render count: {rerenderCount}</h4>
    </div>
  );
};

// Discuss: 我们是否真的需要 使用 memo / useMemo

// Pros: 避免重复渲染 节省性能
// Cons: 过多的使用会消耗大量的内存

export const App = () => {
  const [name, setName] = useState('');

  // 1. 太简单的计算属性, 完全没必要多消耗一份内存
  // const simpleValue = useMemo(() => `Name: ${name}`, [name])
  const simpleValue = `Name: ${name}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
      {/* 情形1: 其他区域与 ExpensiveComp 没有数据联系 */}
      {/* <form>
        <h2>UserForm</h2>
        <input
          type="text"
          placeholder="input your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </form> */}

      <Form />
      <ExpensiveComp />

      {/* 情形3: 直接用一个无关联的 childWrapper */}
      <BgContainer>
        <ExpensiveComp />
      </BgContainer>
    </div>
  );
};

// 最简单的办法， 将网页的其他部分直接抽离成一个组件就可以避免，不需要 memo
const Form = () => {
  const [name, setName] = useState('');

  return (
    <form>
      <h2>UserForm</h2>
      <input
        type="text"
        placeholder="input your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </form>
  );
};

// 用children的方式 也是一种策略
const BgContainer = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState('');

  return (
    <div style={{ backgroundColor, display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
      <input
        type="text"
        placeholder="set the backgroundColor"
        onChange={e => setBackgroundColor(e.target.value)}
      />
      {/* 我们此时无需关心 children 的重新渲染了, 因为 children 不会自己变化 */}
      {children}
    </div>
  );
};


export default App;
