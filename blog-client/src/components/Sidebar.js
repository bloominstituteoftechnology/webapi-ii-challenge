import React from "react";
import "./Sidebar.css";

const Sidebar = props => {
  console.log(props);

  const showPosts = () => {
    props.setDisplayForm(false);
    props.setDisplayPosts(true);
    props.setDisplayPost(false);
  };
  const showPostForm = () => {
    props.setDisplayForm(true);
    props.setDisplayPosts(false);
    props.setDisplayPost(false);
  };

  return (
    <aside className="sidebar">
      <h1> λ Lambda Blog</h1>
      <nav>
        <ul>
          <li onClick={showPosts}>Home</li>
          <li onClick={showPostForm}>Create</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
