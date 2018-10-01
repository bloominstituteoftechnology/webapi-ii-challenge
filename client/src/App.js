import React, { Component } from 'react';
import axios from 'axios';

import PostCard from './components/PostCard';
import './styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:9000/api/posts')
      .then((response) => {
        this.setState(() => ({ posts: response.data }));
      })
      .catch((error) => {
        console.error('Server Error', error);
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    );
  }
}

export default App;
