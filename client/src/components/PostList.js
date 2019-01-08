import React from 'react';
import './PostList.css';
import { Route, Link } from 'react-router-dom';

const PostList = props => {
  console.log('props from Post', props);
  return (
    <div className="post-container">
      <Link to={`/post/${props.post.id}`} className="post">
        <div className="title">{props.post.title}</div>
        <div className="contents">{props.post.contents}</div>
      </Link>
    </div>
  );
};

export default PostList;
