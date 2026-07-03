import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./styles.css";

// The `!` after getElementById is a non-null assertion: it tells
// TypeScript "trust me, this element exists" rather than forcing a null
// check here. Safe in this one spot because index.html always has a
// <div id="root">, hard-coded, that this app controls — not user data
// or anything that could realistically be missing.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
