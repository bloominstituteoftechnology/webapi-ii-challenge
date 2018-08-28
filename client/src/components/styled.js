import styled from 'styled-components';

export const Posts = styled.div`
  width: 50%;
  overflow-y: scroll;
`;

export const Post = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  border: 1px solid black;
  padding: 5px;
  cursor: pointer;
  margin: 10px 0;

  &:hover{
    transform: transistion-x(5px);
  }

  &>p{
    margin-bottom: 2px;
  }
`;

export const PostCreator = styled.form`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 20%;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
  border: 1px solid green;
  margin-right: 25px;
  margin-top: 10px;

  &>input {
    margin: 10px;
    width: 80%;
    height: 20px;
  }
`;
