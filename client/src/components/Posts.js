import React, { Component } from 'react';

import Post from './Post';

class Posts extends Component {
  render() {
    return (
      <div className="Posts">
        <h1>Posts</h1>
        <ul>
          {this.props.posts.map(post => {
            return (
              <Post
                title={post.title}
                id={post.id}
                contents={post.contents}
                key={post.id}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}


export default Posts;
