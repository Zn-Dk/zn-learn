import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function About() {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <h2>This is About</h2>
      <h3>使用 Navigate 跳转</h3>

      {/* {Navigate} 组件一旦被渲染出来 就会引起重定向 */}
      {/* 有 replace 属性决定是否使用 replace 模式 */}
      {flag ? (
        <Navigate
          to={"/home"}
          replace
        />
      ) : (
        false
      )}
      <button onClick={() => setFlag(true)}>点我跳转</button>
    </div>
  );
}
