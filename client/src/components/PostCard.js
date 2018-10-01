import React from 'react';

const PostCard = (props) => {
  return (
    <div>
      <p>{props.post.title}</p>
    </div>
  );
};

export default PostCard;
