import React from "react";
import { Link } from "react-router-dom";

const Posts = props => {
  const { id, title, contents, created_at, updated_at } = props.user;

  return (
    <div>
      <p>ID: {id}</p>
      <p>
        <Link to={`/post/${id}`}>Quote: {title}</Link>
      </p>
      <p>{contents}</p>
      <p>Created: {created_at}</p>
      <p>Updated: {updated_at}</p>
    </div>
  );
};

export default Posts;
