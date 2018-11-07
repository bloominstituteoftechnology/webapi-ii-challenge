import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {
  render() {
    return (
      <div className="Posts">
        <p>
          Drag over trash can to delete post (dragging with the upper righthand
          corner of the note is the easiest way to do this for now)
        </p>
        {this.props.posts.map(post => (
          <Post post={post} key={post.id} handleDrop={this.props.handleDrop} />
        ))}
      </div>
    );
  }
}

export default Posts;
