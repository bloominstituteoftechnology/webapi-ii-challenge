import React from "react";

const PostList = props => {
  return (
    <div>
      {props.post.map(p => {
        return <h1>{p.title}</h1>;
      })}
    </div>
  );
};

export default PostList;
