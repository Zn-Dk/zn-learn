import React, {
  useEffect,
  useInsertionEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useRef } from "react";

const App = () => {
  const boxRef = useRef();
  const box2Ref = useRef();
  const [count, setCount] = useState(0);

  // 先后顺序
  // useInsertionEffect => undefined  count:0
  // useLayoutEffect => <div>..</div> count:0
  // useEffect => <div>..</div>       count:0

  useEffect(() => {
    console.log("useEffect=>", boxRef.current, `count:${count}`);
    // 如果有闪烁就用 useLayoutEffect
    // boxRef.current.style.top = "-500px";
    // boxRef.current.style.backgroundColor = "red";
    
    // box2Ref.current.style.left = "200px";
    // box2Ref.current.style.width = "200px";
  }, []);

  useLayoutEffect(() => {
    console.log("useLayoutEffect=>", boxRef.current, `count:${count}`);
    // 不过说实话, 很少有人在这里做 dom 操作, 没什么意义
    // 个人认为除非有什么参数变量需要特殊初始化
    boxRef.current.style.top = "-500px";
    boxRef.current.style.backgroundColor = "red";

    box2Ref.current.style.left = "200px";
    box2Ref.current.style.width = "200px";
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
        <p>1.useInsertionEffect : 在 state 已经准备好, DOM改变之前</p>
        <p>(相当于 vue 的 created) 动态创建dom并插入到页面的时候使用这个钩子</p>
        <hr />

        <p>2.useLayoutEffect : 在 state 已经准备好, DOM已改变但没有渲染在页面上之前</p>
        <p>(相当于 vue 的 beforeMounted) - 对 DOM 修改导致闪烁的情况使用这个钩子</p>
        <hr />

        <p>3.useEffect 在绘制屏幕之后的操作 (相当于 vue 的 mounted)</p>
        <hr />

        <p>4. 原则是: 总是选择 useEffect (99%场景都适用, 性能保证, 比如api请求/记录日志)</p>
        <p>useLayoutEffect/useInsertionEffect 都是同步钩子, 必须轻量化</p>
      </h2>
      <h3>
        ↑ 上面的边框和颜色就是通过 useInsertionEffect 插入 style 标签实现的
      </h3>
      <h3>
        <p>注意: 由于 React 18 已经很难看出 useLayoutEffect 和 useEffect 的区别,</p>
        <p>如果不出现样式闪烁, 就没必要使用 useLayoutEffect</p>
        <p>不过我个人感觉还是能轻微看出来一点, 特别是底部元素会影响滚动条</p>
        <p>为了追求更好的体验, 可以使用另外两个hooks</p>
      </h3>
      <div style={{ position: "relative" }}>
        <div
          ref={boxRef}
          className="box"
          style={{
            position: "absolute",
            opacity: 0.5,
            top: 0,
            left: 0,
            width: 200,
            height: 200,
            backgroundColor: "#69efdf",
          }}
        />
      </div>
      <div
        ref={box2Ref}
        className="box"
        style={{
          position: "absolute",
          opacity: 0.5,
          top: 50,
          left: 0,
          width: 100,
          height: 100,
          backgroundColor: "#69efdf",
        }}
      />
    </div>
  );
};

export default App;
