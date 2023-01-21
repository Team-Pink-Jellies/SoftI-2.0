import React from "react";
// import { render } from "react-dom";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";

// render(<App />, document.getElementById("root"));

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
