import React from "react";
import App from "./App";
import { render } from "react-dom";
import { createRoot } from "react-dom/client";

const container = document.querySelector("#root");

// React 18- 渲染模式
// render(<App />, container);

// React 18 渲染模式 (useEffect 与 useLayoutEffect 区别进一步缩小)
createRoot(container).render(<App />);
