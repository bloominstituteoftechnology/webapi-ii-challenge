import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import PostList from "./components/PostList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3002/api/posts`)
      .then(response => this.setState({ posts: response.data }))
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <PostList post={this.state.posts} />
      </div>
    );
  }
}

export default App;
