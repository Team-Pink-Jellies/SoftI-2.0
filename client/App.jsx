import React, { Component } from 'react';
import Home from './components/Home.jsx';
import { useSelector } from 'react-redux';
import Login from './components/Login.jsx';
import './styles.css';

function App() {
  // link to state global access to is logged in
  const loginStatus = useSelector((state) => state.question.isLoggedIn);

  return (
    <div id='main'>
      <img src='./assets/login.png' />
      {/* <p>Login Status: {String(loginStatus)}</p> */}
      {loginStatus ? <Home /> : <Login />}
    </div>
  );
}

export default App;
