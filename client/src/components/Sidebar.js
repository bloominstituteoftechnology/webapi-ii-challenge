import React from "react";
import { Link } from "react-router-dom";

//The sidebar component with buttons linking to view page and create page

const Sidebar = props => {
  return (
    <section className="header">
      <h1>Quotable</h1>

      <div className="nav">
        <Link to="/">
          <div className="view-all">My Quotes</div>
        </Link>
        <Link to="/create">
          <div className="create-new">Create New</div>
        </Link>
      </div>
    </section>
  );
};

export default Sidebar;
