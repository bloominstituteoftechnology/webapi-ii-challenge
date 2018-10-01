import React, { Component } from "react";
import axios from "axios";
import "./index.css";

class App extends Component {
  // state to hold posts
  state = {
    posts: []
  };
  // get all posts
  componentDidMount() {
    axios
      .get(`http://localhost:8000/api/posts`)
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Node Express Labs</h1>
        </header>
        <p className="App-intro">posts will go here</p>
      </div>
    );
  }
}

export default App;
