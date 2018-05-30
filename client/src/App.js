import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      posts: []
     }
  }

  componentDidMount() {
    axios 
      .get(`http://localhost:5555/api/posts`)
      .then(response => {
        this.setState(() => ({ posts: response.data}));
      })
      .catch(error => {
        console.error('Server error', error);
      })
  }

  render() {
    console.log(this.state.posts.posts);
    const { posts } = this.state.posts;
    console.log('Posts:', posts);
    return (
      <div className="App">
        <div className="post-container">
          {posts && posts.map(post => 
              <div className="post-card">
                <h2>{post.title}</h2>
                <p>{post.contents}</p>
              </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
