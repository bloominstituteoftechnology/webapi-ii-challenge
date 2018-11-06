import React from 'react';
import Post from './Post';

import './PostWrapper.css';

const PostWrapper = props => {
    return (
        <div className='postWrapper'>
            {props.posts.map(post => {
                return (
                    <div className='singlePostWrapper' key={post.id}>
                        <Post post={post} />
                    </div>
                )
            })}
        </div>
    );
}
 
export default PostWrapper;