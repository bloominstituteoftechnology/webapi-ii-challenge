import React from 'react';
import Post from './Post';
import styled from 'styled-components';

const PostsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: none;
  flex-direction: row;
  width: 100%;
  margin-top: 16px;
  flex-wrap: wrap;
  @media (min-width: 1200px) {
      width: 1200px;
    }
`

const Posts = (props) => {
    return (
        <PostsContainer>
        	{props.posts.map(post => <Post post={post} />)}
        </PostsContainer>
      );
}

export default Posts;