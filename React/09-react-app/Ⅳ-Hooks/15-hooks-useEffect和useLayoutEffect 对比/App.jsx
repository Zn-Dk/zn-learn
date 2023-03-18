import React, { useEffect, useLayoutEffect, useState } from "react";
// import { NavLink, Route, Switch, Redirect, } from "react-router-dom";

export default function App() {
  const [value, setValue] = useState(0);

  // 使用 useEffect 点击按钮渲染时视图发生闪烁
  useEffect(() => {
    if (value === 0) {
         setValue( Math.random() * 200)
    }
  }, [value]);

  // 使用 useLayoutEffect 后视图不会发生闪烁
  // useLayoutEffect(() => {
  //   if (value === 0) {
  //     setValue(Math.random() * 200);
  //   }
  // }, [value]);
  console.log("render", value);
  return (
    <>
      <button
        style={{
          lineHeight: "60px",
          padding: "6px 8px",
          borderRadius: "6px",
          backgroundColor: "#fff",
          border: "1px solid purple",
          outline: "none",
          cursor: "pointer",
        }}
        onClick={() => setValue(0)}
      >
        Value is: {value}
      </button>
    </>
  );
}
