import React, { Component } from 'react';
import './App.css';

import Posts from './Posts';

class App extends Component {
  render() {
    return (
      <div className = 'App'>
        <p>Posts data:</p>
        <Posts />
      </div>
    );
  }
}

export default App;
