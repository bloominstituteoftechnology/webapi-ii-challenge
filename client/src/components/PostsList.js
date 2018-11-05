import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Post from "./Post";

const PostsList = props => {
  if (!props.posts) {
    return (
      <div>
        <h1>Loading Posts...</h1>
      </div>
    );
  } else {
    return (
      <div className="PostsList">
        <div>
          <ul className="list">
            {props.posts
              .map(post => {
                return (
                  <Link to={`/${post.id}`} id={post.id} key={post.id}>
                    <Post
                      title={post.title}
                      id={post.id}
                      contents={post.contents}
                      key={post.id}
                    />
                  </Link>
                );
              })
              .reverse()}
          </ul>
        </div>
      </div>
    );
  }
};

Post.defaultProps = {
  posts: []
};

PostsList.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
  contents: PropTypes.string,
  id: PropTypes.string
};
export default PostsList;
