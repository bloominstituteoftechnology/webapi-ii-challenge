import React from 'react';

const Post = props => {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.contents}</p>
      <button onClick={props.delete(props.id)} >Delete me!</button>
    </div>
  );
};

Post.defaultProps = {
  title: '',
  contents: ''
};

export default Post;