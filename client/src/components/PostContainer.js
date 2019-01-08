import React from 'react';
import PostList from './PostList';
import './PostContainer.css';

const PostContainer = props => {
  console.log('props from PostList', props);
  return (
    <div className="postlist-container">
      <div className="wrapper">
        {props.posts.data.map((post, index) => {
          console.log('from within map', post.title);
          return <PostList post={post} key={index} />;
        })}
      </div>
    </div>
  );
};

export default PostContainer;
