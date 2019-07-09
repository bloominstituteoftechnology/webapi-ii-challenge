import React from "react";

import Post from "./Post";

const PostsList = props => {
  return (
    <div>
      {props.posts.map(post => (
        <Post id={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
