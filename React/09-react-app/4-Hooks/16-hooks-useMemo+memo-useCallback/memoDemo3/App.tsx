import { memo, useMemo, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// 不想被重新渲染的组件
const Child = () => {
  console.log('child render');
  // 如果重新渲染 颜色会变化
  const colors = `#${(~~(Math.random() * (1 << 24))).toString(16)}`;

  return <div style={{ backgroundColor: colors }}>Solid Child</div>;
};

const MemoChild = memo(() => <Child />);

function App() {
  const [count, setCount] = useState(0);
  const [rate, setRate] = useState(1);
  console.log('refresh');

  // 无 memo 每次更新 组件及其子组件都会重新渲染 故值一直变化
  const numberNoMemo = ~~(Math.random() * 1000000);

  // useMemo 且无任何依赖项 [] 内部变量将保持不变
  const numberNeverChange = useMemo(() => ~~(Math.random() * 1000000), []);

  // useMemo与依赖项结合 当 rate 改变时 才触发这个变量的更新
  const numberChangeWithDeps = useMemo(() => ~~(Math.random() * 1000000 * rate), [rate]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <MemoChild />
      <p>numberNoMemo: {numberNoMemo}</p>
      <p>numberNeverChange: {numberNeverChange}</p>
      <p>
        <strong>numberChangeWithDeps will change if rate changed.</strong>
      </p>
      <p>numberChangeWithDeps: {numberChangeWithDeps}</p>
      <button onClick={() => setRate(count => count + 1)}>Add rate {rate}</button>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
      </div>
    </>
  );
}

export default App;
