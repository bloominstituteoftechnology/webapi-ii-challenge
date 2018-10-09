import React, { Component } from 'react';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      contents: ''
    };
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addPost = event => {
    event.preventDefault();
    const newPost = {
      title: this.state.title,
      contents: this.state.contents
    };
    this.props.addPost(newPost);
    this.setState({
      title: '',
      contents: ''
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addPost}>
          <input
            name='title'
            placeholder='title'
            value={this.state.title}
            onChange={this.handleInputChange}
          />
          <input
            name='contents'
            placeholder='contents'
            value={this.state.contents}
            onChange={this.handleInputChange}
          />
          <button type='submit'>Add post</button>
        </form>
      </div>
    );
  }
}

export default PostForm;