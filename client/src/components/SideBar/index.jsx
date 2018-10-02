import React from "react";
import { Link } from "react-router-dom";
import "../components.css";
import "./index.css";
const SideBar = () => {
  return (
    <div>
      <div className="sidebar-wrapper">
        <h1>
          Node
          <br />
          Posts
        </h1>
        <Link to="/">
          <button>View Your Posts</button>
        </Link>
        <Link to="/posts/add">
          <button>+ Create New Post</button>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
