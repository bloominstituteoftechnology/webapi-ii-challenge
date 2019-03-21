import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import Posts from "./Components/Posts/Posts";
import Navigation from "./Components/Navigation/Navigation";
import Home from "./Components/Home/Home";
import Post from "./Components/Post/Post";

import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/posts")
      .then(response => {
        console.log(response);
        this.setState({ posts: response.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/api/posts"
          render={props => <Posts {...props} posts={this.state.posts} />}
        />
        <Route path="/api/posts/:id" render={props => <Post {...props} />} />
      </div>
    );
  }
}

export default App;
