import React from 'react';

const Post = props => {
  return (
    <div className="Smurf">
      <h3>{props.title}</h3>
      <strong>{props.contents}</strong>
    </div>
  );
};

// Smurf.defaultProps = {
//   name: '',
//   height: '',
//   age: ''
// };

export default Post;

