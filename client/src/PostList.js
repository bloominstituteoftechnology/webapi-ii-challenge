import React from 'react'

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid black',
  width: 500,
  padding: 20
}

const postStyle = {
  marginBottom: '10',
  padding: '20'
}

const PostList = ({ posts }) => (
  <div style={listStyle}>
    {posts.map((post, key) => (
      <Post {...post} key={key} />
    ))}
  </div>
)

const Post = ({ title, contents }) => (
  <div style={postStyle}>
    <h1>{title} <em>{contents}</em></h1>
  </div>  
)

export default PostList