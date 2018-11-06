import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {
  render() {
    return (
      <div className="Posts">
        {this.props.posts.map(post => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    );
  }
}

export default Posts;
