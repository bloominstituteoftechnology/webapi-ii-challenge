import React, { Component } from "react";

import styled from "styled-components";

const FormContainer = styled.div`
  align-items: center;
  margin: 0 auto;
  padding-top: 20px;
  max-width: 400px;
  width: 100%;
  height: 1000px;

  input {
    background: white;
  }
`;

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      contents: ""
    };
  }

  addPost = event => {
    event.preventDefault();

    const newPost = {
      name: this.state.title,
      age: this.state.contents
    };

    this.props.add(newPost);

    this.setState({
      title: "",
      contents: ""
    });

    event.target.reset();
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <FormContainer>
        <form onSubmit={this.addPost}>
          <input
            onChange={this.handleInputChange}
            placeholder="Title"
            value={this.state.title}
            name="title"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="Contents"
            value={this.state.contents}
            name="contents"
          />
          <button type="submit">Submit</button>
        </form>
      </FormContainer>
    );
  }
}

export default Form;
