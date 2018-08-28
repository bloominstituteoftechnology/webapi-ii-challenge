import React, { Component } from 'react';
import Posts from './components/posts.js';
import NewPostHandler from './components/newposthandler.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Posts></Posts>
        <NewPostHandler/>
      </div>
    );
  }
}

export default App;
