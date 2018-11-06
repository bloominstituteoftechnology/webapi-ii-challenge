import React from 'react';

const Post = props => {
    return(
        <div>
            <h2>{props.post.title}</h2>
            <p>{props.post.contents}</p>
        </div>
    )
}

export default Post;