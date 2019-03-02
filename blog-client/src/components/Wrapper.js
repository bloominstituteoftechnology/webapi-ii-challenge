import React, { useEffect, useState } from "react";
import "./Wrapper.css";
import { Sidebar, MainContent } from "./index";

const Wrapper = () => {
  const [displayPosts, setDisplayPosts] = useState(true);
  const [displayPost, setDisplayPost] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [postId, setPostId] = useState(0);

  const renderLogic = {
    setDisplayPosts,
    displayPosts,
    setDisplayPost,
    displayPost,
    setDisplayForm,
    displayForm,
    setPostId,
    postId
  };

  return (
    <div className="wrapper">
      <Sidebar {...renderLogic} />
      <MainContent {...renderLogic} />
    </div>
  );
};

export default Wrapper;
