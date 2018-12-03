import styled from "styled-components";

export const Main = styled.div`
  max-width: 600px;
  margin: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  h5 {
    margin-left: 400px;
    align-items: flex-end;
  }
  hr {
    width: 50%;
    margin-right: 400px;
    margin-bottom: 30px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  img {
    margin-top: 40px;
    margin-left: 20px;
  }
  hr {
    width: 100%;
  }
`;

export const Button = styled.button`
  width: 60px;
  padding: 5px;
  text-decoration: none;
  border-radius: 3px;
  border: 1px solid #d6d0c4;
  background-color: #d6d0c4;
  cursor: pointer;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-arround;
  text-indent: 15px;
  margin-bottom: 20px;
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 10px;
  z-index: 1;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 5% 1% 0 10%;
`;
export const Input = styled.input`
  border: 1px solid #333;
  padding: 10px;
  width: 400px;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const TextArea = styled.textarea`
  border: 1px solid #333;
  outline: none;
  font-size: 15px;
  padding: 10px;
  width: 400px;
  height: 50px;
`;

export const Nav = styled.div`
  width: 100vw;
  background-color: #f4f1ea;
  height: 125px;
  a {
    margin: 40px;
    width: 50px;
    padding: 10px;
    text-decoration: none;
    color: black;

  }
  a:hover {
    background-color: #382110;
    width:  50px;
    padding: 10px;
    color: white;
    border-radius: 1px;
  }
`;
