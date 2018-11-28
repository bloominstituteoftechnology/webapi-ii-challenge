import React from "react";

const Post = props => {
  return (
    <div>
      <strong>{props.title}</strong>
      <p>{props.contents}</p>
      <em>{props.created_at}</em>
      <em>{props.updated_at}</em>
    </div>
  );
};

export default Post;
