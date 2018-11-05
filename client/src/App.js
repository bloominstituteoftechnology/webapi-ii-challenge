import React, { Component } from 'react';
import axios from 'axios';
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
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div className="App">
      should see posts

      </div>
    );
  }
}

export default App;
