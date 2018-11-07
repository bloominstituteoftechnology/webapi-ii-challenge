import React, { Component } from 'react';
import Post from './Post';

class PostList extends Component {
  render() {
    return (
      <div className="post-list">
        <h1 className='post-list-title'>Posts</h1>
        <ul>
          {this.props.posts.map(post => {
            return (
              <Post post={post}/>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PostList;