import React, { Component } from 'react';

import PostsList from './PostsList';
import logo from '../logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      post: []
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <PostsList />
      </div>
    );
  }
}

export default App;
