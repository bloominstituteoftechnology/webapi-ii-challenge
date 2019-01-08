import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border-radius: 1rem;
  font-size: 1.4rem;
  padding: 1rem;
  background: papayawhip;
  outline: none;
  border: 3px solid rebeccapurple;
  margin-bottom: 2rem;
`;

const Textarea = styled.textarea`
  border-radius: 1rem;
  font-size: 1.4rem;
  padding: 1rem;
  background: papayawhip;
  outline: none;
  border: 3px solid rebeccapurple;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  border-radius: 1rem;
  font-size: 1.4rem;
  padding: 1rem;
  background: papayawhip;
  outline: none;
  border: 3px solid rebeccapurple;
  margin-bottom: 2rem;
  position: relative;
  box-shadow: 0 6px rebeccapurple;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bolder;
  color: rebeccapurple;

  &:hover {
    top: 2px;
    box-shadow: 0 4px rebeccapurple;
  }

  &:active {
    top: 4px;
    box-shadow: 0 2px rebeccapurple;
  }
`;

export default class PostForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      contents: ""
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let post = this.state;
    if (this.state.title.length && this.state.contents.length) {
      axios
        .post("http://localhost:5000/api/posts", post)
        .then(({ data }) => this.props.addPost(data))
        .catch(err => console.log(err));
    } else return null;
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder="Post Title..."
            onChange={this.handleChange}
            value={this.state.title}
          />
          <Textarea
            type="text"
            name="contents"
            rows="10"
            placeholder="Post Contents..."
            onChange={this.handleChange}
            value={this.state.contents}
          />
          <Button>Add Post</Button>
          <Button onClick={() => this.setState({ title: "", contents: "" })}>
            Reset form
          </Button>
        </Form>
      </div>
    );
  }
}
