import React from 'react';

const Post = props => {
    return(
        <div className='individual-post'>
            <h2>{props.data.title}</h2>
            <p>{props.data.contents}</p>
        </div>
    );
}

export default Post;