import React from 'react';


const PostPreview = props => {
    return (
      <div className='post-preview'>
        <h3>"{props.post.title}"</h3>
        <p>{props.post.contents}</p>
      </div>
    )
}

export default PostPreview;
