import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

import Home from "./component/Home";
import List from "./component/List";
import PostCard from "./component/PostCard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Home} />
        <Route path="/api/posts" component={List} />
        <Route path="/api/posts/:id" component={PostCard} />
      </div>
    );
  }
}

export default App;
