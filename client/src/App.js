import React, { Component } from 'react';

import PostList from './components/PostList';

import './App.css';
import axios from 'axios';

const url = "http://localhost:9000/api/posts";

class App extends Component {
  constructor(){
    super();
    this.state = {
      posts: [],
      currentPost: {
        id: 0,
        title: '',
        contents: ''
      }
    }
  }

  getPosts(){
    axios
      .get(`${url}`)
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  }

  getPostById(id){
    axios
      .get(`${url}/${id}`)
      .then(res => this.setState({ currentPost: res.data }))
      .catch(err => console.log(err));
  }

  postPost(newPost){
    axios
      .post(`${url}`, newPost)
      .then(this.getPosts())
      .catch(err => console.log(err));
  }

  putPost(id, updatedPost){
    axios
      .put(`${url}/${id}`, updatedPost)
      .then(this.getPosts())
      .catch(err => console.log(err));
  }

  deletePost(id){
    axios
      .delete(`${url}/${id}`)
      .then(this.getPosts())
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getPosts();
  }

  render() {
    return (
      <div className="App">
        <PostList posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
