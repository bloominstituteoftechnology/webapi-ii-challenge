import React from 'react';
import Post from './Post';

const PostsList = props => {
    return (
        <ul>
            {props.posts.map(post => (
                <Post post={post} />
            ))}
        </ul>
    );
};

export default PostsList;
