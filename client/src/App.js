import React, { Component } from "react";
import axios from "axios";

import "./App.css";

class App extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    axios
      .get("http://localhost:3000/api/posts")
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.error(err));
  }
  render() {
    console.log(this.state);
    const { posts } = this.state;
    return (
      <div className="App">
        <h1>Welcome to this ugly beast</h1>
        {posts.map((post, index) => (
          <div className="post" key={index}>
            <h2>{post.title}</h2>
            <p>{post.contents}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
