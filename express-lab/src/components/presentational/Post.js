import React from 'react';

const Post = props => {
    return (
        <article className="post" data-id={props.post.id}>
            <div className="name"><p className="post-name">{props.post.contents.trim()}<span> Wrote a Post...</span></p><div data-id={props.post.id} className="delete" onClick={props.deletePost}>Delete</div></div>
            <div className="quote"><h3><em>“{props.post.title.trim().replace(/"/g,"'")}”</em></h3></div>
        </article> 
    )
}

export default Post;