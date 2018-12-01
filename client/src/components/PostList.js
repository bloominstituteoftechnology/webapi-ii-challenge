import React from 'react';

import Post from './Post';

const PostList = props => {
    return (
        <div className='postlist-container'>
            {props.posts.map(post => {
                return <Post key={post.id} post={post} deletePost={props.deletePost}/>
            }) }
        </div>
    )
}

export default PostList;