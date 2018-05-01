import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/posts')
      .then(response => {
        console.log('cdm', response)
        this.setState({ posts: response.data })
      })
      .catch(err => {
        console.error('cdm error', err)
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.state.posts.map((post, index) => {
          return (<div key={post.id + index}>
            <strong>{`${post.id}. ${post.title}`}</strong>
            <p>{post.contents}</p>
          </div>)
        })}
      </div>
    );
  }
}

export default App;
