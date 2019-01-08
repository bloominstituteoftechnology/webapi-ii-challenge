import React from 'react';

const Post = props => {
  return (
    <div className="Smurf">
      <h2>{props.title}</h2>
      <p>{props.contents}</p>
      <button onClick={() => props.deletePost(props.id)}>Delete</button>
    </div>
  );
};

Post.defaultProps = {
  title: '',
  contents: ''
};

export default Post;