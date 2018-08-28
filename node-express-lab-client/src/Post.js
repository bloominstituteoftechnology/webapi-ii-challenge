import React from 'react';

const Post = props => {
  return (
    <div className="post">
      <h4>{props.post.title}</h4>
      <p>{props.post.contents}</p>
    </div>
  );
};

export default Post;