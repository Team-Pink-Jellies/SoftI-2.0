import React from "react";
// import { render } from "react-dom";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { store } from './redux/store.js';


// render(<App />, document.getElementById("root"));

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Provider store={store}>
  <App />;
</Provider >)
