import React, { Component } from "react";

const PostCard = (props) => {
  console.log(props);
  return (
    <div className="EachNote" key={index}>
      <h1>{eachPost.title}</h1>
      <p>{eachPost.contents}</p>
    </div>
  );
};

export default PostCard;
