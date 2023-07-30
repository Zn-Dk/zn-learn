import React, { useState } from 'react';

let rerenderCount = 0;
const ExpensiveComp = () => {
  const t = Date.now();
  while (true) {
    if (Date.now() - t > 500) {
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
  // const [backgroundColor, setBackgroundColor] = useState('');

  return (
    <>
      {/* 情形2: 确实有数据的关联的需求，那我们还可以使用 children 将组件传入 */}
      {/* <div style={{ backgroundColor, display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
        <input
          type="text"
          placeholder="set the backgroundColor"
          onChange={e => setBackgroundColor(e.target.value)}
        />
        <ExpensiveComp />
      </div> */}
      <BgContainer>
        <ExpensiveComp />
      </BgContainer>
    </>
  );
};

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
