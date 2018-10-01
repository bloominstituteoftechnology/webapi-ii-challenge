import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state= {
    posts: []
  }

  componentDidMount(){
    getData();
  };

  getData(){
    axios
    .get(`http://localhost:8000/api/posts`)
    .then(response => {
      this.setState({posts: res.data})
    })
    .catch(err => {
      console.log(err);
    });
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
