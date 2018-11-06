import React from 'react';

const Post = props => {
    return (
        <div className='singlePostWrapper' key={props.post.id}>
            <p>{props.post.title}</p>
            <p>{props.post.contents}</p>
        </div>
    );
}
 
export default Post;