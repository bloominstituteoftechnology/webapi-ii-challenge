import React from 'react';

const PostsList = props => {
    return(
        <div>
            {props.postsData.map(post => {
                return <p key={post.id}>{post.title}</p>
            })}
        </div>
    );
}

export default PostsList;