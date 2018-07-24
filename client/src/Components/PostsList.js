import React from 'react';

import Post from './Post';

const PostsList = () => {
    return (
        <div className='posts-list'>
            <h1>Posts List</h1>
            <Post />
        </div>
    );
}
 
export default PostsList;