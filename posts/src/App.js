import React, { Component } from 'react';
import './App.css';
import Posts from './components/Posts';


class App extends Component {
  render() {
    return (
      <div className="App">
       <Posts />
      </div>
    );
  }
}

export default App;
