import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import Post from './components/Post/Post';
import Posts from './components/Posts/Posts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      title: '',
      contents: ''
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    axios
      .get('http://localhost:5000/api/posts')
      .then(res => {
        console.log(res);
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleNewPost = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addPost = e => {
    const post = {
      title: this.state.title,
      contents: this.state.contents,
    };
    axios
      .post('http://localhost:5000/api/posts', post)
      .then(savedPost => {
        console.log(savedPost);
        this.setState({ title: '', contents: '' });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/posts"
          render={props => (
            <Posts
              {...props}
              posts={this.state.posts}
              handleNewPost={this.handleNewPost}
              addPost={this.addPost}
              state={this.state}
            />
          )}
        />
        <Route
          exact
          path="/posts/:id"
          render={props => (
            <Post
              {...props}
              posts={this.state.posts}
              getPosts={this.getPosts}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
