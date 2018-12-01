import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import PostList from './components/PostList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: {}
    }
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    axios.get('http://localhost:4000/api/posts/')
    .then(posts => {
      this.setState({
        posts: posts.data,
      })
    })
    .catch(()=> {
      console.log('Something went wrong!');
    })
  }

  deletePost(id) {
    axios.delete(`http://localhost:4000/api/posts/${id}`)
    .then(() => {
      this.getPosts();
    })
    .catch((msg) => {
      console.log('Something went wrong! Message from server: ', msg);
    })
  }

  render() {
    if (this.state.posts.length) {
      return (
        <div className="App">
          <PostList deletePost={this.deletePost} posts={this.state.posts} />
        </div>
      );
    }
    else {
      return(
        <h1>Loading Data</h1>
      )
    }
  }
}

export default App;
