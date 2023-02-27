import React, { useEffect, useImperativeHandle, useState } from "react";
import { useRef } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  const ref = useRef();
  const ref2 = useRef();

  const addCount = () => {
    setCount((p) => p + 1);
    ref.current.value = count;
    ref2.current.setIptValue(count);
  };
  useEffect(() => {
    console.log(ref.current); // HTMLElement
    ref.current.value = count;
    ref.current.disabled = true; // 直接暴露整个 dom 很危险,假如被修改了其他的东西呢?

    console.log(ref2.current); // {setIptValue: ƒ}
    ref2.current.setIptValue(count);
  }, []);

  return (
    <div>
      <h1>App</h1>
      <button onClick={addCount}>addCount</button>
      <hr />
      <Demo1 ref={ref} />
      <hr />
      <Demo2 ref={ref2} />
    </div>
  );
}

/** Demo 1
 *  函数式组件不能直接在父组件通过 ref prop 获取 dom
 *  Warning: Function components cannot be given refs.
 *  Attempts to access this ref will fail.
 *  Did you mean to use React.forwardRef()?
 *  (一个组件下可能有多个dom,谁知道你要哪个?)
 *  因此我们用到 React.forwardRef 包裹我们的子组件
 *  此时组件就可以接收到第二个参数 ref, 这样我们就可以暴露内部 dom
 */

export const Demo1 = React.forwardRef((props, ref) => {
  return (
    <div>
      <h2>Demo1</h2>
      <h3>向父元素直接暴露DOM 以便操作,可行但组件不可控</h3>
      <input
        type="text"
        ref={ref}
      />
    </div>
  );
});

/** Demo 2
 *  直接暴露整个 DOM 元素让组件本身变的不受控
 *  类似 vue3 的 defineExpose , react 可以使用 useImperativeHandle
 *  结合 React.forwardRef 一起使用
 *  这个 Hooks 中 第一个参数接收 ref props,
 *  第二个参数是回调,返回的值作为父组件接收的 ref 内容
 *  如果我们只是希望父元素能够修改组件的内部值,就只暴露改值的方法就行了
 */

export const Demo2 = React.forwardRef((props, ref) => {
  const intRef = useRef();

  // 这个时候组件内部控制这个修改值的方法 组件变得可控
  const setIptValue = (val) => {
    intRef.current.value = val;
  };

  useImperativeHandle(ref, () => {
    return { setIptValue }; // 只返回修改的方法
  });

  return (
    <div>
      <h2>Demo2</h2>
      <h3>
        组件内部使用 useImperativeHandle 自定义暴露的内容
        控制父元素可以修改的范围
      </h3>
      <input
        type="text"
        ref={intRef}
      />
    </div>
  );
});
