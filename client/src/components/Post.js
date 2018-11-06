import React from 'react';

const Post = ({ post }) => {
  return (
    <div className="Post">
      <h3>{post.title}</h3>
      <div>{post.contents}</div>
    </div>
  );
};

export default Post;
