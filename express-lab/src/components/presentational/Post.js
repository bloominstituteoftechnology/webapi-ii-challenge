import React from 'react';

const Post = props => {
    return (
        <div className="post">
            <div className="quote"><h3><em>“{props.post.title.trim().replace(/"/g,"'")}”</em></h3></div>
            <div className="name"><p>- {props.post.contents.trim()}</p></div>
        </div> 
    )
}

export default Post;