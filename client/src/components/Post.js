import React from 'react';
import './Post.css';

const Post = props => {
  console.log('props from Post', props);
  return (
    <div className="post-container">
      <div className="card">
        <div className="title">{props.post.title}</div>
      </div>
    </div>
  );
};

export default Post;
