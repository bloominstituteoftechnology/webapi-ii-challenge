import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  /* When mounted pull in users api. In package.json you'll need to proxy 
   the node url */

  componentDidMount() {
    fetch("api/posts")
      .then(res => res.json())
      .then(posts => this.setState({ posts }));
  }
  render() {
    return (
      <div className="App">
        <h1>Posts</h1>
      </div>
    );
  }
}

export default App;
