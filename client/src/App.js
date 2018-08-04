import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Post from './Post';
import PostForm from './PostForm';

class App extends Component {
  // constructor(props) { //only use this if you're using redux or props from somewhere
  //   super(props);
  //   this.state = {
  //     posts: [],
  //     title: '',
  //     contents: ''
  //   };
  // }

  state = {
    posts: [],
    title: '',
    contents: ''
  };

  componentDidMount() {
    axios
      .get('http://localhost:8000/api/posts')
      .then((response) => this.setState({ posts: response.data }))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.posts.map((post) => <Post post={post} />)}
        <PostForm />
      </div>
    );
  }
}

export default App;
