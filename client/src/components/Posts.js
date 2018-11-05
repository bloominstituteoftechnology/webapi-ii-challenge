import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {
  render() {
    return (
      <div>
        <h1>These are the posts</h1>
        {this.props.posts.map(post => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    );
  }
}

export default Posts;
