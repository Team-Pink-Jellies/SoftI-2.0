import React, { Component } from "react";
import Home from './components/Home.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>softI</h1>
        <Home />
      </div>
    );
  }
}



export default App;
