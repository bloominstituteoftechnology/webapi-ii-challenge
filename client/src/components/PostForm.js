import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFriend } from '../actions';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const FormWrapper = styled.form`
  max-width: 600px;
  min-width: 500px;
`;
const InputWrapper = styled.input`
  display: flex;
  flex-direction: column;
  width: 600px;
`;
const TextAreaWrapper = styled.textarea`
  width: 598px;
  resize: none;
  border: 1px solid lightgray;
`;
class PostForm extends Component {
  state = {
    contents: '',
    title: ''
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.addNote(this.state);
    this.setState({
      contents: '',
      title: ''
    });
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <FormWrapper onSubmit={this.submitHandler}>
        <InputWrapper
          type="text"
          value={this.state.title}
          name="title"
          placeholder="Title"
          onChange={this.changeHandler}
          autoComplete="off"
          required
        />
        <TextAreaWrapper
          rows="10"
          type="text"
          value={this.state.contents}
          name="contents"
          placeholder="Contents"
          onChange={this.changeHandler}
          autoComplete="off"
          required
        />
        <InputWrapper type="submit" value="Add New Post" />
      </FormWrapper>
    );
  }
}

export default withRouter(
  connect(
    null
    // { addNote } FIX THIS ONCE YOU'VE GOT THE API SET UP
  )(PostForm)
);
