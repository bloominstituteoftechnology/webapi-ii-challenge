import React, { useEffect, useState } from "react";
import "./MainContent.css";
import { PostsContainer, Post, PostForm } from "./index";

const MainContent = () => {
  const [displayPosts, setDisplayPosts] = useState(true);
  const [displayPost, setDisplayPost] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [postId, setPostId] = useState(0);
  return (
    <div className="main-content">
      {/* Need to pass set to posts container */}
      {displayPosts && (
        <PostsContainer
          setDisplayPosts={setDisplayPosts}
          setPostId={setPostId}
        />
      )}
      {displayPost && <Post id={postId} />}
      {displayForm && <PostForm />}
    </div>
  );
};

export default MainContent;
