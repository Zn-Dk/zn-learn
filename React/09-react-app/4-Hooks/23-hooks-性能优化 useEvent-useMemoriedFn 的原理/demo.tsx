'use client';
import { useMemoizedFn } from 'ahooks';
import React, { memo, useCallback, useRef, useState } from 'react';
import type { FC } from 'react';

type BtnProps = {
  onClick: () => void;
  children?: React.ReactNode;
};

const Child: FC = memo(() => {
  console.log('child render');
  return <div>child</div>;
});

const Btn: FC<BtnProps> = memo(({ onClick }) => {
  console.log('btn render');

  return (
    <button
      className="p-4 font-bold backdrop-blur-2xl"
      style={{ backgroundColor: 'rgba(255,255,255, 0.5)' }}
      onClick={onClick}
    >
      Hello world
    </button>
  );
});

type Func = (...args: any[]) => void;
const useMyMemoizedFn = (fn: Func) => {
  // 创建一个 ref 使得函数不会被外部修改
  const fnRef = useRef<Func>(fn);
  fnRef.current = fn;

  // 再次使用 useCallback 包裹这个函数返回
  const wrapFn = useCallback((...args: any[]) => {
    fnRef.current(...args);
  }, []);
  return wrapFn;
};

const test: FC = props => {
  const [foo, setFoo] = useState(0);
  const add = () => {
    setFoo(foo + 1);
  };

  const cbAdd = useCallback(add, [foo]);
  // 使用 useCallback, enclosure 依然包含上级作用域
  console.dir(cbAdd);

  // 使用 ahooks 的 useMemoizedFn, 使用 ref 返回不变的 object 代理 fn
  // 废弃的 React.useEvent 基本同理
  const cbMemorizedAdd = useMyMemoizedFn(add);
  console.dir(cbMemorizedAdd);

  return (
    <div>
      test
      <Btn onClick={cbMemorizedAdd}>Hello world</Btn>
      <p>{foo}</p>
      <Child></Child>
    </div>
  );
};

export default test;
