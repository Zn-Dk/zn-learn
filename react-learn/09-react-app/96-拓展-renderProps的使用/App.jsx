import React from "react";
import "./App.css";
// 如何向组件内部动态传入带内容的结构(标签)?
// Vue中:
//     使用slot技术, 也就是通过组件标签体传入结构  <A><B/></A>
// React中:
//     使用children props: 通过组件标签体传入结构
//     使用render props: 通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性

export default function App() {
  return (
    <>
      <h1>RenderProps 的使用(作用域插槽)</h1>
      <hr />
      <h2>
        <strong>通过 children props</strong>
      </h2>
      <p>问题: (类似 Vue 作用域插槽) 即 如果想要拿到 A组件内的数据 拿不到</p>
      <A>
        <h2>你好我是A组件</h2>
      </A>
      <A />
      <hr />
      <h2>
        <strong>通过 render props</strong>
      </h2>
      {/* 3.在此接收子组件内的 state 传入 C 子组件 */}
      {/* 在此处动态的声明 B>C 的父子关系 (那么今后 B 只需要提供这个state 后代可以是任何组件) */}
      <B render={(state) => <C person={state} />} />
    </>
  );
}

// 这里模拟了 Vue中 的默认插槽
function A(props) {
  return <div>{props.children ? props.children : <h2>A 组件默认内容</h2>}</div>;
}

// Render Prop
function B(props) {
  // 1.数据被 B 组件持有, 但需要通过传递到外面实现插槽
  const person = { name: "John", age: 13 };

  // 2.首先在渲染时执行该组件 render 方法并将组件内 state 放入回调
  return (
    <div className="b">
      <h2>B 组件</h2>
      {props.render(person)}
    </div>
  );
}

function C(props) {
  const { person } = props;
  return (
    <div className="c">
      <h3>我是 C 组件</h3>
      <p>姓名: {person.name}</p>
      <p>年龄: {person.age}</p>
    </div>
  );
}
