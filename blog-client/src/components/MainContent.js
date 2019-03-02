import React, { useEffect, useState } from "react";
import "./MainContent.css";
import { PostsContainer } from "./index";

const MainContent = () => {
  return (
    <div className="main-content">
      <PostsContainer />
    </div>
  );
};

export default MainContent;
