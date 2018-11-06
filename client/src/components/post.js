import React from 'react';
import { Link } from 'react-router-dom';

function Post(props) {
  return (
    <Link to={`/posts/${props.post.id}`} className='post-container'>
      <p>{props.post.title}</p>
      <h4>{props.post.contents}</h4> 
      <input placeholder='Guess'/>
    </Link>
  )
}

export default Post
