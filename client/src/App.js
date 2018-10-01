import React, { Component } from 'react';
import './App.css';

import { Route, withRouter } from 'react-router-dom';
import PostListView from './views/PostListView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={PostListView} />
      </div>
    );
  }
}

export default withRouter(App);
