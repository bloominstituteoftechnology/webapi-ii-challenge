import React from 'react'
import styled from 'styled-components'

/**
 * Styled-Components
 */

 const PostCard = styled.div`
  display: flex; 
  flex-flow: column nowrap;
  align-items: center;
 `


const Post = props => {
  const post = props.posts.find(post => `${post.id}` === props.match.params.id)
  return (
    <PostCard>
      <h2>{post.title}</h2>
      <p>{post.contents}</p>
      <button
        onClick={() => {
          props.history.push('/')
        }}
      >
        Back
      </button>
    </PostCard>
  )
}

export default Post
