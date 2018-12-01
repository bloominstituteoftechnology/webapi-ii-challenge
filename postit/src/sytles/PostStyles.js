import styled from "styled-components";

export const Main = styled.div`
  max-width: 600px;
  margin: 40px;
  display: flex;
  flex-direction: column;
  hr {
    width: 50%;
    margin-right: 400px;
    margin-bottom: 30px;
  }
`;

export const Contianer = styled.div`

  hr {
    width: 100%;
  }
`;

export const Button = styled.button`
  border: none;
  width:50px;
  padding: 5px;
  margin: 0;
  text-decoration: none;
  border-radius: 3px;
  border: 1px solid #d6d0c4;
  background-color: #d6d0c4;
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  padding:10px;
  z-index: 2;
`;
