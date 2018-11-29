import React from 'react';

import Post from './Post';
import './Post.css';

const Posts = props => {

  return (
    <div className="posts-container">
      {props.posts.map((post) => {
        return (
          <div key={post.id} id={post.id}>
            <Post post={post}/>
          </div>
        )
      })}
    </div>
  )
}

export default Posts;