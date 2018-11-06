import React from 'react'

const PostForm = props => {
  return (
    <div>
      <button onClick={props.history.push('/')}>Return Home</button>
    </div>
  )
}

export default PostForm
