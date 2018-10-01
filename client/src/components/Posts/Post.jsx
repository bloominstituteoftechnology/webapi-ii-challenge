import React from 'react';

function Post(props) {
    return (
        <div>
            <h1>{props.post.title}</h1>
            <p>{props.post.contents}</p>
        </div>
    )
};

export default Post;