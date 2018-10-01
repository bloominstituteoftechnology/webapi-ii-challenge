import React from "react";

const Post = props => {
  return (
    <div>
      {props.id},{props.title},{props.contents},{props.created_at},
      {props.updated_at}
    </div>
  );
};

export default Post;
