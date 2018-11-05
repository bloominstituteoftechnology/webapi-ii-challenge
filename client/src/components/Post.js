import React from 'react';


const Post = props => {
  return (
    <div className='post-container'>
      <div className='buttons'>
        <div className='button delete-button'>
          <i className="fas fa-trash"/>
        </div>
        <div className='button edit-button'>
          <i className="fas fa-pen-nib"/>
        </div>
      </div>
      <h3>"{props.post.title}"</h3>
      <p>{props.post.contents}</p>
    </div>
  )
}
export default Post;
