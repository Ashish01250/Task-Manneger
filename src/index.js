import { createRoot } from "react-dom/client";
import React from "react";
import ReactDOM from "react-dom";
// import App from "./Components/ParticalBg.jsx";
import "./App.css";
import App from "./App";
// Create a root using createRoot
const root = createRoot(document.getElementById("root"));

// Render your app inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
