import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './components/PostsList.css';

import axios from 'axios';

import PostsList from './components/PostsList';


class App extends Component {
  state = {
      posts: []
    };

componentDidMount() {
  axios.get('http://localhost:9000/api/posts')
      .then(response => {
        console.log(response);
        this.setState({ posts: response.data });
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
          <h1 className="App-title">Node Express Lab Day 1</h1>
        </header>
        <div>
        <PostsList postsList={this.state.posts} />
        </div>
      </div>
    );
  }
}

export default App;
