import React from 'react';
import Post from './Post';
import './PostList.css';

const PostList = props => {
  console.log('props from PostList', props);
  return (
    <div className="postlist-container">
      <div className="card">
        {props.posts.data.map((post, index) => {
          console.log('from within map', post.title);
          return <Post post={post} key={index} />;
        })}
      </div>
    </div>
  );
};

export default PostList;
