import React from 'react';

const Post = props => {
    return (
        <div className='post-container'>
            <p className='post-title'>{props.post.title}</p>
            <p className='post-contents'>{props.post.contents}</p>
        </div>
    )
}

export default Post;