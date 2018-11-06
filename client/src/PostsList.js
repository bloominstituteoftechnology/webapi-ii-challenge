import React from 'react';

const PostsList = (props) => {
    return(
        <div className="posts">
            {props.posts.map(post => {
                return(
                    <div key={post.id} className="post">
                        <h3>{post.title}</h3>
                        <p>{post.contents}</p>
                    </div>
                );
            })}
        </div>
    );
} 

export default PostsList;