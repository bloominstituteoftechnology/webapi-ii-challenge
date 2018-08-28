import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

const URL = "http://localhost:8000/api/posts/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    axios
      .get(URL)
      .then(response => {
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
        <ul style={{ listStyle: "none" }}>
          {this.state.posts.map(post => {
            return (
              <li style={{ color: "black" }} key={post.id}>
                {post.title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
