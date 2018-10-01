import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  };

  componentDidMount() {
    axios
      .get('http://localhost:8000/posts')
      .then(res => {
        console.log('testing api call');
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err);
      })
  };

  render() {
    return (
      <div className = 'App'>
        <p>Test: </p>
      </div>
    );
  }
}

export default App;
