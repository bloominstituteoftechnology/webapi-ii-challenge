import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

import Post from './components/Post';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8500/api/posts')
      .then(response => {
        this.setState({
          posts: response.data
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    console.log(this.state.posts);
    return (
      <div className="App">
        {this.state.posts.map(post => {
          return <Post post={post} key={post.id} />;
        })}
      </div>
    );
  }
}

export default App;
