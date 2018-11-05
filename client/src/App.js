import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor() {
    super()
      this.state = {
        posts: [],
      }
  }
  componentDidMount() {
    axios
      .get('http://localhost:5000/api/posts')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
