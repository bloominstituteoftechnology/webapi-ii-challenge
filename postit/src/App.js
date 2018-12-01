import React, { Component } from 'react';
import './App.css';
import Posts from './components/Posts'
// import {Route} from 'react-router-dom'

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
