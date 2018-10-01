import React from 'react';

import PostsList from './PostsList';

function PostsContainer(props) {
    return (
        <div>
            <h1>Posts: </h1>
            <PostsList posts={props.posts} />
        </div>
    )
};

export default PostsContainer;