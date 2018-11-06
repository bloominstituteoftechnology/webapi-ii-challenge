import React from "react";

const Post = props => {
  console.log(props);
  return (
    <div>
      {props.posts.map(post => {
        return (
          <div key={post.id}>
            <p>{post.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
