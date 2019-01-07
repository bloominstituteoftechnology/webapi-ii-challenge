import React, { Component } from 'react';
import axios from 'axios';


import './App.css';

class App extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/posts')
    .then(response => {
      console.log(response)
      this.setState({ posts: response.data })
    })
    .catch(err => console.log(err));
  }


  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
