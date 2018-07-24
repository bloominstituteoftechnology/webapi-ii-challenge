import React from 'react';
import styled from 'styled-components';

const PostDiv =  styled.div`
  border: 1px solid lightgrey;
  display: flex;
  justify-content: space-between;
  align-items: none;
  flex-direction: column;
  background-color: #fff;
  width: 380px;
  margin-bottom: 16px;
  padding: 24px;
`
const Header = styled.div `
  font-size: 25px;
  font-family: Didot, serif;
`

const Post = (props) => {
    return (
        <PostDiv>
            <Header>{props.post.title}</Header>
            <p>{props.post.contents}</p>
        </PostDiv>
      );
}

export default Post;