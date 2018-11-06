import React from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'

/**
 * Styled-Components
 */

 
const PostCard = styled.div`

  

`

const Button = styled.button`
  width: 120px;
  height: 20px;
  font-family: 'Open Sans';
  font-size: 10px;
  border: 1px solid black;
  border-radius: 5px;
`

const Post = props => {
  const post = props.posts.find(post => `${post.id}` === props.match.params.id)
  return (
 
      <PostCard>
        <h2>{post.title}</h2>
        <p>{post.contents}</p>
        <Button
          onClick={() => {
            props.deletePost(post.id)
            props.history.push('/')
          }}
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            props.history.push('/')
          }}
        >
          Back
        </Button>
      </PostCard>
  
  )
}

export default Post
