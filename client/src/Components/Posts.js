import React from 'react';
import Post from './Post';

const Posts = props => {
    return (
        <div >
            {props.posts.map(post => 
                <Post key={post.id} post={post}/>
            )}
        </div>
    );
}

export default Posts;