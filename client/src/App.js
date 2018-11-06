import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      post: []
    }
  }

  componentDidMount() {
    axios
    .get(`http://localhost:5000/api/posts`)
    .then(response => this.setState({post: response.data}))
    .catch(error => console.log(error));
  }

  render() {
    console.log(this.state.post)
    return (
      <div className="App">
        {this.state.post.map(post => {
          return (
            <div>
              <h3>{post.title}</h3>
              <p>{post.contents}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
