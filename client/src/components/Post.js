import React from "react";

const Post = props => {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.contents}</p>
      <em>{props.created_at}</em>
      <em>{props.updated_at}</em>
    </div>
  );
};

export default Post;
