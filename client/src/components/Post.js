import React from 'react'

const Post = props => {
    return (
        <div className='post-container'>
            <p>{props.post.title}</p>
            <p>{props.post.contents}</p>
            <p>{props.post.created_at}</p>
            <p>{props.post.updated_at}</p>
        </div>
    );
}

export default Post;