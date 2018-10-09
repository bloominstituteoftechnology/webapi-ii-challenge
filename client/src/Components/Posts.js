import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {
  render() {
    return (
      <div>
        <h1>Posts</h1>
        <div>
          {this.props.posts.map(post => {
            return (
              <Post
                key={post.id}
                title={post.title}
                contents={post.contents}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

export default Posts;