import React, { Component } from 'react';
import './App.css';

import { Route, withRouter } from 'react-router-dom';

import Home from './components/Home/Home';
import NavigationBar from './components/Navigation/NavigationBar';
import PostListView from './views/PostListView';
import PostFormView from './views/PostFormView';
import PostView from './views/PostView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route component={NavigationBar} />
        <Route exact path="/" component={Home} />
        <Route exact path="/posts" component={PostListView} />
        <Route exact path="/form" component={PostFormView} />
        <Route exact path="/posts/:id" component={PostView} />
      </div>
    );
  }
}

export default withRouter(App);
