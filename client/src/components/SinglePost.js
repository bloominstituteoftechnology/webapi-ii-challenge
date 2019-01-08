import React from 'react';
import styled from 'styled-components';

const SinglePostContainerDiv = styled.div`
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const SinglePostWrapperDiv = styled.div`
  align-content: center;
  margin-top: 30%;
  padding: 5%;
  background-color: #f2f2f2;
  border-radius: 2.5%;
`;

const SinglePostTitle = styled.div`
  font-weight: 600;
  padding: 5%;
`;

const Post = props => {
  return (
    <SinglePostContainerDiv>
      <SinglePostWrapperDiv>
        {props.posts.data.map((post, index) => {
          return post.id === parseInt(props.match.params.id) ? (
            <div key={index}>
              <SinglePostTitle>{post.title}</SinglePostTitle>
              <div>{post.contents}</div>
            </div>
          ) : null;
        })}
      </SinglePostWrapperDiv>
    </SinglePostContainerDiv>
  );
};

export default Post;
