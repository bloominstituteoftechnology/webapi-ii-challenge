import React, { Component } from "react";
import { Route } from "react-router-dom";
import PostList from "./components/PostList";

export default class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/api/posts" component={PostList} />
      </div>
    );
  }
}
