import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import PostContainer from './components/PostContainer';
import LoadingSpinner from './components/LoadingSpinner';
import { Route, Link } from 'react-router-dom';
import Post from './components/Post';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/posts').then(response => {
      console.log('response from component', response);
      this.setState({
        posts: response,
        isLoaded: true
      });
    });
    // axios.get('/api/posts').then(response => {
    //   console.log(response);
    // });
  }

  render() {
    console.log('The state:', this.state.posts);
    return (
      <div className="App">
        {this.state.isLoaded === true ? (
          <PostContainer posts={this.state.posts} />
        ) : (
          <LoadingSpinner />
        )}
        <div>
          <Route path="/post" component={Post} />
        </div>
      </div>
    );
  }
}

export default App;
