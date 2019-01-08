import React, { Component } from 'react';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      contents: ''
    };
  }

  submitChange = e => {
    e.preventDefault();
    this.props.addPost(this.state);
  }

  handleInputChange = e => {
    this.setState({ [e.target.title]: e.target.value });
  };

  render() {
    return (
      <div className="PostForm">
        <form onSubmit={this.submitChange}>
          <input
            onChange={this.handleInputChange}
            placeholder="title"
            value={this.state.title}
            name="title"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="contents"
            value={this.state.contents}
            name="contents"
          />
          <button type="submit">Add Post</button>
        </form>
      </div>
    );
  }
}

export default PostForm;