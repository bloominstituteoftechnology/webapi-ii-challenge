import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Post from "./components/post";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/posts/")
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state.posts);
    return (
      <div>
        <Post posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
