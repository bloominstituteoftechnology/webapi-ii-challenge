import React from 'react';

export default function Post(props) {
  const { title, contents } = props.post;
  return(
    <div>
      <h3>{ title }</h3>
      <p>{ contents }</p>
    </div>
  );
}