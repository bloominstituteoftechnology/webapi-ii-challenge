import React, { Component } from 'react';


class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      contents: ''
    };
  }

  addPost = (event) => {
    event.preventDefault();
    const newPost = {
      title: this.state.title,
      contents: this.state.contents
    }
    this.props.addNewPost(newPost);

    this.setState({
      title: '',
      contents: ''
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="Form">
        <form onSubmit={this.addPost}>
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