import React from 'react';
import '../CSS/Post.css';

export default function Post(props) {
  return (
    <div>
      <p>
        <span className="bold">Title: </span>{props.post.title}
      </p>
    </div>
  )
}