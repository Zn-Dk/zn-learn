// React
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
// Router
import { BrowserRouter } from "react-router-dom";

import App from "./App";

// ** react-redux 使用的是 Provider 组件监听 故不需要手动 subscribe **
// 在 Provider 传入整个 store 状态, 在子级的视图容器就可以接收
ReactDOM.render(
  // 如果有路由还要包一层
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
  document.querySelector("#root")
);
