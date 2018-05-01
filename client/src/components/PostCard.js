import React from 'react';
import '../styles/PostCard.css';

const PostCard = props => {
  return (
    <div className="PostCard">
      <p className="PostCard_id">{props.post.id}</p>
      <p className="PostCard_title">{props.post.title}</p>
      <p className="PostCard_contents">{props.post.contents}</p>
    </div>
  )
}

export default PostCard;