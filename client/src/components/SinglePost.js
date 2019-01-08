import React from 'react';
import './SinglePost.css';

const Post = props => {
  console.log('props from individual post', props);
  return (
    <div className="single-post-container">
      <div className="single-post-wrapper">
        {props.posts.data.map((post, index) => {
          return post.id == props.match.params.id ? (
            <div>
              <div className="single-post-title">{post.title}</div>
              <div className="single-post-contents">{post.contents}</div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Post;
