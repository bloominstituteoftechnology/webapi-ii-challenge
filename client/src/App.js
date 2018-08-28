import React, { Component } from 'react';
import Posts from './components/posts.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Posts></Posts>
      </div>
    );
  }
}

export default App;
