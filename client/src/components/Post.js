import React from "react";
import PropTypes from "prop-types";

const Post = props => {
  return (
    <div className="quote-card">
      <div className="title">
        <p>{props.title}</p>
      </div>
    </div>
  );
};

//Sets default prop values
Post.defaultProps = {
  title: "",
  contents: ""
};

//Type validation for props
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired
};

export default Post;
