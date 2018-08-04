import React, { Component } from 'react';
import axios from 'axios';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      contents: ''
    };
  }

  addPost = () => {
    const post = {
      title: this.state.title,
      contents: this.state.contents
    };
    axios
      .post('http://localhost:8000/api/posts', post)
      .then((response) => this.setState({ posts: response.data, title: '', contents: '' }))
      .catch((error) => {
        console.log(error);
      });
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="PostForm">
        <form onSubmit={this.addPost}>
          <input
            onChange={this.handleInput}
            placeholder="title"
            value={this.state.title}
            name="title"
          />
          <input
            onChange={this.handleInput}
            placeholder="contents"
            value={this.state.contents}
            name="contents"
          />
          <button type="submit" onSubmit={this.addPost}>
            Add Post
          </button>
        </form>
      </div>
    );
  }
}

export default PostForm;
