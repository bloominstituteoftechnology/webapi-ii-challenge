import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to Jorge Osto's API Interactive Docs</h1>
          <p>If you're ready to see something cool just follow the link below!</p>
          <a
            className="App-link"
            href="http://localhost:4000/api-docs/"
          >
            Here is where the magic starts!
          </a>
        </header>
      </div>
    );
  }
}

export default App;
