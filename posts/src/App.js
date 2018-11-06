import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Route } from "react-router-dom";
import List from "./components/List";
import Post from "./components/Post";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/api/posts/")
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <h1>Blog</h1>
        <Route
          exact
          path="/"
          render={props => <List {...props} posts={this.state.posts} />}
        />
        <Route path="/:id" component={Post} />
      </div>
    );
  }
}

export default App;
