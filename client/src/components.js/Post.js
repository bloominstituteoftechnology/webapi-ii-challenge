import React from 'react';

const Post = props => {
    return (
        <div  >
            <p>{props.post.title} </p>
            <p>{props.post.contents} </p>
        </div>
    )
}

export default Post;