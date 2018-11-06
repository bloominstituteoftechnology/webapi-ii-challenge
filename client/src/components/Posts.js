import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 20px;
  padding: 50px 0;
  text-align: center;
  
  h2 {
    text-align: center;
    font-size: 1.500rem;
  }

  button {
    width: 50px;
    height: 20px;
    border: 1px solid black;
  }

`

const Posts = props => {
  return (
    <Container>
      {props.posts.map(post => {
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.contents}</p>
            <button 
              onClick={() => {
                props.getById(post.id)
                props.history.push(`/${post.id}`)
              }}
            >
              VIEW
            </button>
          </div>
        )
      })}
    </Container>
  )
}

export default Posts
