import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 5px 0;
`

const Textarea = styled.textarea`
  border: none;
  border-bottom: 1px solid gray;
  padding: 5px;
  margin: 5px 0;
  resize: none;
  min-height: 20px;
  &:focus {
    border-bottom: 2px solid #03DAC5;
    outline: none;
  }
`
const Button = styled.input`
  width: 50%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
  border-radius: 2px;
  border: none;
  background-color: #6200EE;
  color: white;
  padding: 6px 0;
  margin-top: 3px;
`

const Form = ({handleSubmit, title, contents, onChange}) => (
  <StyledForm onSubmit={handleSubmit}>
    <Textarea
      type="text"
      name='title'
      value={title}
      placeholder="Enter title"
      onChange={onChange}
    />
    <Textarea
      type="text"
      name='contents'
      value={contents}
      placeholder="Enter contents"
      onChange={onChange}
    />
    <Button type="submit" value='Submit'/>
  </StyledForm>
);

export default Form;