import React, { Component } from 'react';

import Post from './Post';

class Posts extends Component {
  render() {
    return (
      <div>
        <h1>Hobbit Posts</h1>
        <ul>
          {this.props.posts.map(post => {
            return (
              <Post
                title={post.title}
                id={post.id}
                contents={post.contents}
                key={post.id}
                delete={this.props.delete}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

Post.defaultProps = {
 posts: [],
};

export default Posts;