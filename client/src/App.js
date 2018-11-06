import React, { Component } from 'react';

import './App.css';
import Hobbits from './components/hobbits';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>
            Hobbit Quotes
          </h1>
          <Hobbits />
       
      </div>
    );
  }
}

export default App;
