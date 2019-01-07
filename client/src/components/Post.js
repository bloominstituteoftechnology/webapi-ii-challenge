import React from 'react';

const Post = props => {
    return (
        <li>
            <h1>{props.post.title}</h1>
            <p>{props.post.contents}</p>
            <p>{props.post.created_at}</p>
        </li>
    );
};

export default Post;
