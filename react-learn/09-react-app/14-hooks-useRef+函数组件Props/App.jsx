import React, { useState, useRef } from "react";
import { useEffect } from "react";

/*
  1. 接收父组件的 Props
    函数式组件会接收到父组件传来的Props 在该函数的第一个参数中 function (props) {}
  2.useRef
    (1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
    (2). 语法: const refContainer = useRef()
    (3). 作用:保存标签对象,功能与React.createRef()一样

    注意事项：

    返回一个子元素索引，这个索引在整个生命周期中保持不变
    对象发生改变时，不通知，属性变更不重新渲染
    保存一个值，在整个生命周期中维持不变
    重新赋值 ref.current 不会触发重新渲染
    相当于创建一个额外的容器来存储数据，我们可以在外部拿到这个值
*/
export default function App() {
  const [name, setName] = useState("John");

  // useRef === React.createRef 创建 DOMElement-Ref
  // const inputRef = createRef();
  const inputRef = useRef();
  const changeName = () => {
    // 通过 ref.current 获取这个 DOM 元素
    const { value } = inputRef.current;
    if (value) setName(value);
    else alert("输入为空");
  };

  useEffect(() => {
    console.log("inputRef 发生改变");
  }, [inputRef.current]);

  // 初始化一个 ref 变量 = 123
  const testRef = useRef(123);
  // 修改Ref属性 可以发现页面不渲染
  const changeTest = () => {
    testRef.current = "456";
  };

  // 引入一个变量 起到刷新功能
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    refresh && setTimeout(() => setRefresh(false));
  }, [refresh]);
  const doRefresh = () => {
    setRefresh(true);
  };

  // useEffect(() => {
  //   console.log("change!");
  // });

  return (
    <div>
      <h1>React Hooks 使用之 useRef和 函数组件Props </h1>
      <h2>当前 name 的值: {name}</h2>
      <h2>当前 test 的值: {testRef.current}</h2>
      <br />
      <input
        type="text"
        ref={inputRef}
      />
      <button onClick={changeName}>改名</button>
      <button onClick={changeTest}>修改Ref属性 Test</button>
      <button onClick={doRefresh}>强制刷新</button>
      <p>可以看到只有更改非Ref属性,带动视图重新渲染 testRef 值才会更新</p>
      <hr />
      <Child msg="Hello Child">
        {/* 双标签内部的属性被传入 props.children 中 */}
        <h1>Child 组件</h1>
      </Child>
    </div>
  );
}

// 子组件接收 props
function Child(props) {
  console.log(props);

  return (
    <div>
      {props.children}
      <p>收到的 Props : {props.msg}</p>
    </div>
  );
}
