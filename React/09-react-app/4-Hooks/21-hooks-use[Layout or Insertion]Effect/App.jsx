import React, {
  useEffect,
  useInsertionEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useRef } from "react";

const App = () => {
  const boxRef = useRef();
  const [count, setCount] = useState(0);

  // 先后顺序
  // useInsertionEffect => undefined  count:0
  // useLayoutEffect => <div>..</div> count:0
  // useEffect => <div>..</div>       count:0

  useEffect(() => {
    console.log("useEffect=>", boxRef.current, `count:${count}`);
    // 如果有闪烁就用 useLayoutEffect, 否则正常用就行 (react 18 做了优化)
    // boxRef.current.style.top = "200px";
    // boxRef.current.style.backgroundColor = "red";
  }, []);

  useLayoutEffect(() => {
    console.log("useLayoutEffect=>", boxRef.current, `count:${count}`);
    boxRef.current.style.top = "200px";
    boxRef.current.style.backgroundColor = "red";
  }, []);

  useInsertionEffect(() => {
    console.log("useInsertionEffect=>", boxRef.current, `count:${count}`);
    // 仅限于 css-in-js 库使用。它允许 css-in-js 库解决在渲染中注入样式的性能问题。
    // useLayoutEffect 动态生成 style 标签再次影响布局，导致浏览器再次回流和重排
    // 这时候就可以使用 useInsertionEffect

    /* 动态创建 style 标签插入到 head 中 */
    const style = document.createElement("style");
    style.innerHTML = `
     .test {
        color: #358;
        border: 1px solid #358;
      }
     `;
    document.head.appendChild(style);
  }, []);

  return (
    <div>
      <h1>useLayOutEffect | useEffect | useInsertionEffect 三者的区别</h1>
      <h2 className="test">
        1.useInsertionEffect : 在 state 已经准备好, DOM改变之前 <br />
        (相当于 vue 的 created) - css-in-js
        动态创建样式并插入到页面的时候使用这个钩子 <br /> <hr />
        2.useLayoutEffect : 在 state 已经准备好, DOM
        已改变但没有渲染在页面上之前 <br />
        (相当于 vue 的 beforeMounted) - 对 DOM 修改导致闪烁的情况使用这个钩子
        <br />
        <hr />
        3.useEffect 在绘制屏幕之后的操作 (相当于 vue 的 mounted)
      </h2>
      <h3>
        ↑ 上面的边框和颜色就是通过 useInsertionEffect 插入 style 标签实现的
      </h3>
      <h3>
        注意: 由于 React 18 已经很难看出 useLayOutEffect 和 useEffect 的区别,
        <br />
        因此如果不出现样式闪烁, 就没必要使用 useLayOutEffect
      </h3>
      <div style={{ position: "relative" }}>
        <div
          ref={boxRef}
          className="box"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 200,
            height: 200,
            backgroundColor: "#69efdf",
          }}
        />
      </div>
    </div>
  );
};

export default App;
