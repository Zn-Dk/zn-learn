import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// redux
import { Provider } from "react-redux";
import store from "./redux/store";

import App from "./App";

const container = document.querySelector("#root");

const root = createRoot(container);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
