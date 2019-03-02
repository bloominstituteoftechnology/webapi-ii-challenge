import React from "react";
import "./PostCard.css";

const PostCard = ({ title, contents }) => {
  function clipText(text, maxLength) {
    return text.slice(0, maxLength).concat(" ...");
  }

  const maxBodyLen = 230;
  const maxTitleLen = 25;

  return (
    <section className="post-card">
      <h2>{clipText(title, maxTitleLen)}</h2>
      <p>{clipText(contents, maxBodyLen)}</p>
    </section>
  );
};

export default PostCard;
