import React, { useEffect, useState } from "react";
import "./MainContent.css";
import { PostsContainer, Post, PostForm } from "./index";

const MainContent = () => {
  const [displayPosts, setDisplayPosts] = useState(true);
  const [displayPost, setDisplayPost] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [postId, setPostId] = useState(0);

  const renderLogic = {
    setDisplayPosts,
    setDisplayPost,
    setDisplayForm,
    setPostId,
    postId
  };

  return (
    <div className="main-content">
      {/* Need to pass set to posts container */}
      {displayPosts && <PostsContainer {...renderLogic} />}
      {displayPost && <Post {...renderLogic} />}
      {displayForm && <PostForm {...renderLogic} />}
    </div>
  );
};

export default MainContent;
