import React from 'react';

function Post(props) {
    console.log(props);
    return <div>{props.posts.map(post => <p>{post}</p> )}</div>
}

export default Post