import React, { useState } from "react";
import { useEffect } from "react";
import { unmountComponentAtNode } from "react-dom";

/*
  (1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
  (2). React中的副作用操作:
          发ajax请求数据获取
          设置订阅 / 启动定时器
          手动更改真实DOM
  (3). 语法和说明:
          useEffect(() => {
            // 在此可以执行任何带副作用操作
            return () => { // 在组件卸载前执行
              // 在此做一些收尾工作, 比如清除定时器/取消订阅等
            }
          }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行

  (4). 可以把 useEffect Hook 看做如下三个函数的组合
          componentDidMount()
          componentDidUpdate()
          componentWillUnmount()
*/
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("John");

  const add = () => {
    setCount(count + 1);
    // setCount((count) => count + 1); 用于累加
  };
  const toggleName = () => {
    setName(name === "Jack" ? "John" : "Jack");
  };

  const unmount = () => {
    unmountComponentAtNode(document.querySelector("#root"));
  };

  useEffect(() => {
    console.log("Component Mount");

    let timer = setInterval(() => {
      // 不可以写成这种形式 setCount(count + 1); 因为这样会导致获取的 count 永远都是 0 + 1
      setCount((count) => count + 1);
    }, 1000);

    return () => {
      // 返回的 callback 会在卸载前执行 => 可以起到 componentWillUnmount 的作用
      clearInterval(timer); // hooks 的方便之处, 可以直接从上下文取变量
      console.log("组件卸载");
    };
  }, []);
  // 传入空数组 只在组件初次挂载后运行 => 可以起到 componentDidMount 的作用
  // 如果不传第二个参数 默认监测所有的变化

  // 分别监视 count,name 变量 在组件初次挂载+变量更新时运行 => 可以起到 componentDidMount+Update 的作用
  useEffect(() => {
    console.log("count 值被改变了!");
  }, [count]);

  useEffect(() => {
    console.log("name 值被改变了!");
  }, [name]);

  return (
    <div>
      <h1>React Hooks 使用之 useEffect</h1>
      <h2>当前 count 的值: {count}</h2>
      <h2>当前 name 的值: {name}</h2>
      <button onClick={add}>Add</button>
      <button onClick={toggleName}>切换名字为 Jack</button>
      <button onClick={unmount}>卸载组件</button>
    </div>
  );
};
