import React from 'react'

const PostList = ({ posts }) => (
  <div>
    {posts.map((post, key) => (
      <Post {...post} key={key} />
    ))}
  </div>
)

const Post = ({ title, contents }) => (
  <h1>{title} <em>{contents}</em></h1>
)

export default PostList