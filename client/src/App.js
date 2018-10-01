import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  state ={
    posts: []
  }

  componentDidMount() {
    axios
    .get('http://localhost:8001/api/posts')
    .then(res => {
      this.setState(() => ({posts: res.data}));
    })
    .catch(err => {
      console.log('Server Error:', err)
    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
