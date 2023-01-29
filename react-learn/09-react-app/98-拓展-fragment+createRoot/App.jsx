import React from "react";
import { Fragment } from "react";

/*
  fragment 组件的使用
  同 Vue3, 允许存在多个根节点
  两种形式声明 fragment
    - 原始语法 使用 <Fragment></Fragment>
    - 短语法 使用空标签 <></> (但是空标签不能在 for循环内传 key)
*/

// export default function App() {
//   return (
//     <Fragment>
//       <h1>Fragment 的基本使用</h1>
//       <header style={{ backgroundColor: "yellowgreen" }}>Header</header>
//       <main style={{ backgroundColor: "skyblue" }}>main</main>
//       <footer style={{ backgroundColor: "violet" }}>footer</footer>
//     </Fragment>
//   );
// }

export default function App() {
  return (
    <>
      <h1>Fragment 的基本使用</h1>
      <header style={{ backgroundColor: "yellowgreen" }}>Header</header>
      <main style={{ backgroundColor: "skyblue" }}>main</main>
      <footer style={{ backgroundColor: "violet" }}>footer</footer>
    </>
  );
}
