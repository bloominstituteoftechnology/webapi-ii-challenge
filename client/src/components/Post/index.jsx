import React from "react";

const Post = props => {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.contents}</p>
    </div>
  );
};

export default Post;
