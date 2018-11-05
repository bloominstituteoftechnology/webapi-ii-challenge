import React, { Component } from 'react';

import axios from 'axios';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5800/api/posts')
      .then(response => {
        console.log('response', response.data);
        this.setState({ posts: response.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">Welcome to LotR Quotes!</header>
        {this.state.posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.contents}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
