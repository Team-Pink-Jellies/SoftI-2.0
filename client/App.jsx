import React, { Component } from "react";
import Home from './components/Home.jsx';


class App extends Component {
  render() {
    return (
      <div>
        <h1>softI</h1>
        <Home />
      </div>
    );
  }
}

function patrice() {
  console.log("patrice");
}

export default App;
