import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
// BrowserRouter -> H5 history 模式
// HashRouter -> hashChange 模式
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <StrictMode>
    {/* 在 index.js 这一层把 App 整体包在 Browser/HashRouter 的壳下控制 SPA */}
    <HashRouter>
      <App />
    </HashRouter>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.querySelector("#root")
);
