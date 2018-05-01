import React from 'react';
import '../styles/PostCard.css';

const PostCard = props => {
  return (
    <div className='PostCard'>
      <p>{props.post.id}</p>
      <p>{props.post.title}</p>
      <p>{props.post.contents}</p>
    </div>
  )
}

export default PostCard;