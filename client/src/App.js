import React, { Component } from 'react';
import './App.css';
import PostList from './Components/PostList';

const uuidv4 = require('uuid/v4');

class App extends Component {
  render() {
    return (
      <div className="App">
        <PostList key = {uuidv4()} />
      </div>
    );
  }
}

export default App;
