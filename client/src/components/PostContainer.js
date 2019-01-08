import React from 'react';
import PostList from './PostList';
import styled from 'styled-components';

const PostContainerDiv = styled.div`
  width: 65%;
  margin: 0 auto;
  background-color: #f2f2f2;
`;

const PCWrapperDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: center;
  margin-top: 20%;
`;

const PostContainer = props => {
  return (
    <PostContainerDiv>
      <PCWrapperDiv>
        {props.posts.data.map((post, index) => {
          return <PostList post={post} key={index} />;
        })}
      </PCWrapperDiv>
    </PostContainerDiv>
  );
};

export default PostContainer;
