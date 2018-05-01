import React, { Component } from "react";
import axios from "axios";
// material components
import RaisedButton from "material-ui/RaisedButton";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  // fetch data from database localhost:5000
  componentDidMount() {
    this.getPostsList();
  }
  getPostsList() {
    axios
      .get("http://localhost:5000/api/posts")
      .then(response => {
        // console.log("response: ", response.data);
        this.setState({ posts: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.log("state: ", this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <RaisedButton label="Primary" primary={true} />
      </div>
    );
  }
}

export default App;
