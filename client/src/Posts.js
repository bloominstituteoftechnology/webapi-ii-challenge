import React, { Component } from 'react';
import axios from 'axios';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8000/posts')
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err);
      })
    };

    render() {
      return (
        <div className = 'posts-list'>
          {this.state.posts.map(post => {
            <div key = {post.id}>
              <h1>{post.title}</h1>
              <p>{post.contents}</p>
            </div>
          })}
        </div>
      );
  }
}

export default Posts;
