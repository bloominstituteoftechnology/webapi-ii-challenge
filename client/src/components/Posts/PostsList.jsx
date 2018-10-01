import React, { Fragment } from 'react';

import Post from './Post';

function PostsList(props) {
    if (props.posts === undefined || props.posts === null) return null;
    return <Fragment>{props.posts.map(post => <Post key={post.id} post={post} />)}</Fragment>
};

export default PostsList;