import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import './LeftRail.css';

const LeftRail = () => {
  return (
    <div className="left-rail">
      <div className="title">
        <h1>
          <strong>Posts!</strong>
        </h1>
      </div>
      <Link to="/posts" className="btn btn-block">
        View All Posts
      </Link>
      <Link to="/createpost" className="btn btn-block">
        + New Post
      </Link>
    </div>
  );
};

export default LeftRail;
