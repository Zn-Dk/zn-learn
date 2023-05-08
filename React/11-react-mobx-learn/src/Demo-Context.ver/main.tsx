import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";



// 3. 引入 store 传入组件 props
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App/>);
