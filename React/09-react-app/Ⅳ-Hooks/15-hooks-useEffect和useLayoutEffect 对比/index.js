import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.querySelector("#root");

createRoot(container).render(<App />);
