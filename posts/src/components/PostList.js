import React from "react";
import Post from "./Post";

export default function PostList(props) {
  if (!props.posts || !props.posts.length) {
    return <h1>Loading Your Posts...</h1>;
  }
  return (
    <div className="post-list-wrapper">
      {props.posts.map(post => (
        <div className="post-card" key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}
