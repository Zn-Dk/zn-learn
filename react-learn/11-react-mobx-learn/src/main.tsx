import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "mobx-react";
import store from "./store";

// 2. Provider 传入组件 props
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider {...store}>
    <App />
  </Provider>
);
