import React from 'react';

const post = props => {
  const { title, contents } = props.post;

  return (
    <div>
      <h1>{title}</h1>
      <p>{contents}</p>
    </div>
  );
};

export default post;
