import styled from 'styled-components';

export const Posts = styled.div`
  width: 50%;
  margin-top: 10px;
  overflow-y: scroll;
  padding-right: 10px;
`;

export const Post = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  border: 1px solid lightgrey;
  padding: 5px;
  cursor: pointer;
  margin: 0 0 1px;
  position: relative;
  background: white;

  &:hover{
    transform: transistion-x(5px);
  }

  &>p{
    margin-bottom: 2px;
  }

  &>span{
    position: absolute;
    top: 5px;
    right: 5px;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    background: red;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
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
  margin-right: 25px;
  margin-top: 10px;
  background: white;

  &>input {
    margin: 10px;
    width: 80%;
    height: 20px;
  }
`;
