import React from 'react';

const Post = (props) => {
    return(
        <div>
            <h3>{props.postTitle}</h3>
            <p>{props.body}</p>
        </div>
    )
}

export default Post;