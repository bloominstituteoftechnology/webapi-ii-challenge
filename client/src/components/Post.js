import React from 'react';
import styled from 'styled-components';

const StyledPost = styled.div`
  background-color: blue;
  color: white;
  border: 2px solid gray;
  border-radius: 8px;
  width: 30%;
  margin: 10px auto;
`;

const Post = props => {
  return (
    <StyledPost>
      <h2>{props.post.title}</h2>
      <p>{props.post.contents}</p>
    </StyledPost>
  );
};

export default Post;
