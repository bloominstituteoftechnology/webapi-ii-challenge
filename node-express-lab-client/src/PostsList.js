import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

 import Post from './Post';
 import FormInput from './FormInput';

 export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      title: "",
      contents: ""
    };
  }

   componentDidMount() {
    axios
      .get('http://localhost:8000/api/posts')
      .then(response => {
        this.setState(() => ({
            posts: response.data
        }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewPost = e => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/posts', {
      title: this.state.title,
      contents: this.state.contents
    })
      .then(response => {
        this.setState({ posts: response.data });
      })
      .then(() => window.location.reload(true))
      .catch(error => {
        console.log(error);
      });
  }

   render() {
      return (
        <div className='post-list'>
        {this.state.posts.map(post => (
          <Link to={`/posts/${post.id}`} key={post.id}>
          <Post post={post} />
          </Link>
        ))}
          <FormInput
          title={this.state.title}
          contents={this.state.contents}
          handleChange={this.inputHandler}
        />
        <button onClick={this.addNewPost}>Add Post</button>
        </div>
    )}
  
  }
 
