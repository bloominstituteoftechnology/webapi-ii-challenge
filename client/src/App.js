import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {
  state ={
    posts: []
  }

  componentDidMount() {
    axios
    .get('http://localhost:9000/api/posts')
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
        <h1>Posts:</h1>
      </div>
    );
  }
}

export default App;
