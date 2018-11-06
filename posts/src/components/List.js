import React from "react";
import { Link } from "react-router-dom";

const List = ({ posts }) =>
  posts.map(post => (
    <Link to={`/${post.id}`}>
      <div key={post.id}>
        <h2>{post.title}</h2>
        <p> {post.contents} </p>
      </div>
    </Link>
  ));

export default List;
