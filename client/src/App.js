import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }
  render() {
    return <div className="App" />;
  }
}

export default App;
