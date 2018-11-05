import React from 'react'

function Post(props) {
  return (
    <div className='post-container'>
      <p>{props.post.title}</p>
      <h4>{props.post.contents}</h4> 
      <input placeholder='Guess'/>
    </div>
  )
}

export default Post
