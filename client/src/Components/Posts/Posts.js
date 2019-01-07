import React from "react";

import './Posts.css'

const Posts = props => {
  return props.posts.map(post => (
    <div
      className="post-container"
      key={post.id}
      onClick={() => props.history.push(`/api/posts/${post.id}`)}
    >
      <h3>{post.title}</h3>
      <p>{post.contents}</p>
    </div>
  ));
};

export default Posts;
