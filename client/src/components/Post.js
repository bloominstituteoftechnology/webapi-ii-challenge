import React from 'react';
import './Post.css';

const Post = props => {
  
  return (
    <div className="post-container">
      <h4>{props.post.title}</h4>
      <p>{props.post.contents}</p>
    </div>
  )
}

export default Post;