import React from 'react';

const Post = props => {
    return (
        <div className="post">
            <div className="name"><p>{props.post.contents.trim()}<span> Shared a Post</span></p></div>
            <div className="quote"><h3><em>“{props.post.title.trim().replace(/"/g,"'")}”</em></h3></div>
            
        </div> 
    )
}

export default Post;