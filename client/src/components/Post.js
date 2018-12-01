import React from 'react';

import './post.css'

const Post = props => {
    return (
        <div className='post-container'>
            <div className='post-button-delete' onClick={()=> {props.deletePost(props.post.id)}}>X</div>
            <p className='post-title'>{props.post.title}</p>
            <p className='post-contents'>{props.post.contents}</p>
        </div>
    )
}

export default Post;