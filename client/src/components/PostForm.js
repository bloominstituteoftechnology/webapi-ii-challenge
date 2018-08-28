import React from 'react';
import { PostCreator } from './styled';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostForm extends React.Component{
  constructor(){
    super();
    this.state = {
      title: '',
      contents: '',
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    if(this.state.title && this.state.contents){
      const newPost = {
        title: this.state.title,
        contents: this.state.contents
      };
      this.props.createPost(newPost);
      this.setState({ title: '', contents: '' });
    }
  }

  render(){
    return(
      <PostCreator onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          name="title"
          value={this.state.title}
          placeholder="Title"
        />
        <input
          onChange={this.handleChange}
          name="contents"
          value={this.state.contents}
          placeholder="Contents"
        />
        <button type="submit">Create Post</button>
      </PostCreator>
    );
  }
}

export default connect(null, { createPost })(PostForm);
