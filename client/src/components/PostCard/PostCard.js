import React from 'react';
import './PostCard.css';

const PostCard = props => {
    return(
        <div className="post-card-wrapper">
            <blockquote className="post-card-title">{props.post.title}</blockquote>
            <h3 className="post-card-contents">{props.post.contents}</h3>
        </div>
    );
}

export default PostCard;