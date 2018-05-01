import React from 'react';

const PostCard = props => {
  return (
    <div className="PostCard">
      <div className="PostCard_header">
        <p className="PostCard_id">{props.post.id}</p>
        <p className="PostCard_delete"
          onClick={() => props.delete(props.post.id)}>x</p>
      </div>
      <div className="PostCard_body">
        <p className="PostCard_title">{props.post.title}</p>
        <p className="PostCard_contents">{props.post.contents}</p>
      </div>
    </div>
  )
}

export default PostCard;