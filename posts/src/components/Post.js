import React from "react";

export default function Post(props) {
  return (
    <div className="post">
      <h3>{props.post.title}</h3>
      <p>{props.post.contents}</p>
    </div>
  );
}
