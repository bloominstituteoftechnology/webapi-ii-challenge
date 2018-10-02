import React from "react";
import "../components.css";
import "./index.css";
import { Link } from "react-router-dom";

const PostList = props => {
  if (!props.posts) {
    return <div>Posts are loading...</div>;
  }
  // if the posts do exist then we can slice them and reverse them so that newest post is shown first
  const posts = props.posts.slice().reverse();

  return (
    <div className="main-container">
      <h2>Your posts:</h2>
      <div className="post-previews-container">
        {posts.map(post => {
          return (
            <Link to={`/posts/${post.id}`} key={Math.random()}>
              <div className="post-preview-container">
                <h3>{post.title}</h3>
                <p>{post.contents}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PostList;
