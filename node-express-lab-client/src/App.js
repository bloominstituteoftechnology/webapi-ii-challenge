import React, { Component } from 'react';
import { Route } from "react-router-dom";

import PostsList from "./PostsList";
import PostPage from "./PostPage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Node-Express-Lab Notes</h1>
        <Route exact path="/" component={PostsList} />
        <Route path="/posts/:id" component={PostPage} />
      </div>
    );
  }
}

export default App;
