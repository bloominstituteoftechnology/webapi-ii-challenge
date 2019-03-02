import React from "react";
import "./PostCard.css";

const PostCard = ({ title, contents }) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>{contents}</p>
    </section>
  );
};

export default PostCard;

// {
//
// }
