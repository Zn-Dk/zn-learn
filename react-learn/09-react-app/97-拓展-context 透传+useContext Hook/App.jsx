import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { createContext, useState } from "react";

const PersonContext = createContext({ name: "Jack", age: 16 }); // 默认值 说明见下
const ColorContext = createContext();

export default function App() {
  const [person] = useState({ name: "张三", age: 24 });

  // 演示数据单项流动
  const [color, setColor] = useState("#ffffff");

  return (
    <div style={{ backgroundColor: "violet" }}>
      <h1>Context 透传(类 Vue Provide-Inject)</h1>
      {/* 提供数据 使用 Context.Provider (提供者)组件 并传递  value */}
      {/* 如果父组件没有经过 Provider 包装 而孙组件又使用了 Consumer 默认值才会生效  */}
      {/* 如果有 Provider 必须向后代提供 value 参数 */}

      {/* 示例: 多个 Context 使用 */}
      <PersonContext.Provider value={person}>
        <ColorContext.Provider value={{ color, setColor }}>
          <Parent />
        </ColorContext.Provider>
      </PersonContext.Provider>
    </div>
  );
}

// 1. Hooks 使用 useContext 函数提取数据 (扁平化管理 Context 更轻量)
function Parent() {
  const { age, name } = useContext(PersonContext);
  const { color } = useContext(ColorContext);

  return (
    <div style={{ backgroundColor: "skyblue", padding: "20px" }}>
      <h2>
        Parent 组件 使用 <strong>useContext</strong> 接收属性
      </h2>
      <p>{`PersonContext: name${name} | age${age} `}</p>
      <p>{"ColorContext: " + color}</p>
      <Child />
    </div>
  );
}

// 2. 使用 Context 上的 Consumer 组件 (多个 Context 时来回嵌套 不方便)
function Child() {
  const colorPicker = useRef();
  return (
    <div style={{ backgroundColor: "yellowgreen", padding: "20px" }}>
      Child 组件
      {/* 使用 Consumer(消费者) 接收 */}
      {/* 获得携带 value 参数的回调函数 */}
      {/* 下面演示了嵌套消费多个 Context 的情形 */}
      <PersonContext.Consumer>
        {(person) => {
          console.log(person);
          return (
            <ColorContext.Consumer>
              {({ color, setColor }) => {
                console.log(color);
                return (
                  <>
                    <h3>收到来自 App 的消息 : </h3>
                    <p>姓名: {person.name}</p>
                    <p>年龄: {person.age}</p>
                    {/* Context 传入的值应使用传入的回调修改(数据单项原则) */}
                    <p>Color 的值: {color}</p>
                    <input
                      type="text"
                      ref={colorPicker}
                    />
                    <button
                      onClick={(e) => setColor(colorPicker.current.value)}
                    >
                      更新颜色
                    </button>
                  </>
                );
              }}
            </ColorContext.Consumer>
          );
        }}
      </PersonContext.Consumer>
    </div>
  );
}
