import React from 'react';
const Post = props => {
    return (
        <div className='quote'>
            <p>{props.post.title}</p>
            <span className="delete" onClick={() => props.deleteHandler(props.post.id)}>✖</span>
        </div>
    )
}
export default Post;