import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./App.css";

import Home from "./component/Home";
import List from "./component/List";
import PostCard from "./component/PostCard";



class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/api/posts" component={List} />
        <Route path="/api/posts/:id" render={props => <PostCard {...props} props1={this.props} />} />
      </div>
    );
  }
}

export default App;
