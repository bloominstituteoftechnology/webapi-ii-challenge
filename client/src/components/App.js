import React, { Component } from 'react';
import axios from 'axios';

import PostsList from './PostsList';
import logo from '../logo.svg';
import '../styles/App.css';

class App extends Component {
  state = { posts: [] };

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    axios.get('http://localhost:5000/api/posts')
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err);
      })
  }

  deletePost = id => {
    axios.delete(`http://localhost:5000/api/posts/${id}`)
      .then(() => {
        this.getPosts();
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <PostsList
          posts={this.state.posts}
          delete={this.deletePost}
        />
      </div>
    );
  }
}

export default App;
