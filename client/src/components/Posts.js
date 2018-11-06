import React from 'react'


const Posts = props => {
  return (
    <div className="container">
      {props.posts.map(post => {
        return (
          <div key={post.id}>
            <h2>Title: {post.title}</h2>
            <p>Contents: {post.contents}</p>
            <button 
              onClick={() => {
                props.getById(post.id)
                props.history.push(`/${post.id}`)
              }}
            >
              Post
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Posts
