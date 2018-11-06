import React from "react";

const PostList = props => {
  return (
    <div>
      {props.post.map(p => {
        return (
          <div className="quote-card">
            <h2>{p.title}</h2>
            <p>{p.contents}</p>
            <ul className="dates">
              <li>Created at: {p.created_at}</li>
              <li>Updated at: {p.updated_at}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
