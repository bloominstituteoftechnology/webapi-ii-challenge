import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';

export default class PostList extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios
    .get('http://localhost:9000/api/posts')
    .then(res => {
      this.setState(() => ({ 
        posts: res.data
      }));
    })
    .catch(err => {
      console.error('Server Error', err);
    });
  }

  render() {
    return(
      <div>
        {this.state.posts.map((p, i) => (
          <Post key={i} post={p} />)
        )}
      </div>
    );
  }
}