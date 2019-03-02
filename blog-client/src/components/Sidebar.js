import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h1> λ Lambda Blog</h1>
      <nav>
        <ul>
          <li>Home</li>
          <li
            onClick={() => {
              console.log("testificate");
            }}
          >
            Create
          </li>
          <li>Another Link</li>
          <li>Another Link</li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
