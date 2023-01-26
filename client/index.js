import React from 'react';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
