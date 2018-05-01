import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Whatever this is.</h1>
      <Link to="/api/posts">
        <button>Click here to see all the posts available</button>
      </Link>
    </div>
  );
};

export default Home;
