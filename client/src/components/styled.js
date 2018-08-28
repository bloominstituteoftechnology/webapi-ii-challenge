import styled from 'styled-components';

export const Posts = styled.div`
  width: 50%;
  overflow-y: scroll;
`;

export const Post = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid black;
  padding: 5px;
  cursor: pointer;

  &:hover{
    transform: transistion-x(5px);
  }

  &>p{
    margin-bottom: 2px;
  }
`;
