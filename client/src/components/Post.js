import React from 'react';

const Post = props => {
  return (
    <div className="Smurf">
      <h2>{props.title}</h2>
      <p>{props.contents}</p>
    </div>
  );
};

Post.defaultProps = {
  title: '',
  contents: ''
};

export default Post;