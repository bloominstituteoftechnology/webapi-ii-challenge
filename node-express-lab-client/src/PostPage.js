import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import Post from './Post';
import FormInput from './FormInput';

export default class PostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        post: {},
        title: "",
        contents: "",
    };
  }
  
  componentDidMount() {
    axios
      .get(`http://localhost:8000/api/posts/${this.props.match.params.id}`)
      .then(response => {
        this.setState(() => ({
            post: response.data[0]
        }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editPost =(id) => {
    console.log(id);
    axios.put(`http://localhost:8000/api/posts/${id}`, {
      title: this.state.title,
      contents: this.state.contents
  })
    .catch(error => {
      console.log(error);
    });
  }

  deletePost =(id) => {
    console.log(id);
    axios.delete(`http://localhost:8000/api/posts/${id}`)
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Link to={`/`}><button>Home</button></Link>
        <Post post={this.state.post} />
        <FormInput
          title={this.state.title}
          contents={this.state.contents}
          handleChange={this.inputHandler}
        />
        <button onClick={() => this.editPost(this.state.post.id)}>Edit post</button>
        <button onClick={() => this.deletePost(this.state.post.id)}>Delete post</button>
      </div>
    );
  }
}
