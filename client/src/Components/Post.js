import React from 'react';

const Post = props => {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.contents}</p>
    </div>
  );
}

export default Post;