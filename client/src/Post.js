import React from 'react';

function Post(props) {
    return (
        <div className='post'>
             <h3 className='contents'>{props.post.contents}:</h3>
            <h2 className='title'>"{props.post.title}"</h2>
        </div>
    );
}

export default Post;
