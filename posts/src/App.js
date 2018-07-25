import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [
        {
          title: ""
        }
      ]
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/api/posts")
      .then(response => {
        console.log("response.data is: ", response.data, response);
        this.setState({ posts: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {this.state.posts.map(post => {
            return <p key={Math.random()}>{post.title}</p>;
          })}
        </div>
      </div>
    );
  }
}

export default App;
