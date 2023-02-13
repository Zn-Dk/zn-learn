import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// REDUX + RTKQ
import { Provider } from "react-redux";
import store from "./store";

const container = document.querySelector("#root");

createRoot(container).render(
  <Provider store={store}>
    <App />
  </Provider>
);
