import React from "react";
import "./PostCard.css";

const PostCard = ({ title, contents, clickHandler, id }) => {
  function clipText(text, maxLength) {
    return text.slice(0, maxLength).concat(" ...");
  }

  const maxContentLen = 230;
  const maxTitleLen = 25;

  return (
    <section
      className="post-card"
      onClick={() => {
        clickHandler(id);
      }}
    >
      <h2>
        {title.length > maxTitleLen ? clipText(title, maxTitleLen) : title}
      </h2>
      <p>
        {contents.length > maxContentLen
          ? clipText(contents, maxContentLen)
          : contents}
      </p>
    </section>
  );
};

export default PostCard;
