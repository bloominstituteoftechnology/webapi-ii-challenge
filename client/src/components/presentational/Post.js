import React from 'react';
import styled from 'styled-components';

const PostStle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 27%;
  padding: 10px 2%;
  margin-bottom: 10px;
  height: 240px;
  background: maroon;
`

function Post(props) {
  return (
    <PostStle>
      <h5>{props.post.title}</h5>
      <p>{props.post.contents}?</p>
    </PostStle>
  )
}

export default Post;