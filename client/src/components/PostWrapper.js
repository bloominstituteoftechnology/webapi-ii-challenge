import React from 'react';
import Post from './Post';

const PostWrapper = props => {
    return (
        <div className='postWrapper'>
            {props.posts.map(post => {
                return (
                    <Post post={post} />
                )
            })}
        </div>
    );
}
 
export default PostWrapper;