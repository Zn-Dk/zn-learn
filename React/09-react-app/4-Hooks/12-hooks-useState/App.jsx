import React, { useState } from 'react';

/*
  (1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
  (2). 语法: const [xxx, setXxx] = React.useState(initValue)
  (3). useState()说明:
          参数: 第一次初始化指定的值在内部作缓存 (单例模式)
          返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
  (4). setXxx()2种写法:
          语法糖写法 适用于简单情况 setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
          原本函数写法 适用于复杂情况 setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
*/

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // let myCount = 0; // 因为每次渲染函数都会重新执行, 单纯的变量声明无法保持状态
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  const add = () => {
    setCount(count + 1);
    // setCount((count) => count + 1);
  };
  const toggleName = () => {
    setName(name === 'Jack' ? 'John' : 'Jack');
  };

  return (
    <div>
      <h1>React Hooks 使用之 useState</h1>
      <h2>当前 count 的值: {count}</h2>
      <h2>当前 name 的值: {name}</h2>
      <button onClick={add}>Add</button>
      <button onClick={toggleName}>切换名字为 Jack</button>
    </div>
  );
};
