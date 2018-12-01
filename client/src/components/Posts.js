import React from "react";

const Posts = props => {
  return (
    <div>
      {props.posts.map(post => {
        return (
          <div key={post.id}>
            <p>Id: {post.id}</p>
            <h1>{post.title}</h1>
            <p>{post.contents}</p>
            <p>Created: {post.created_at}</p>
            <p>Updated: {post.updated_at}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Posts;
