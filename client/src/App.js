import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import PostList from './components/PostList';
import LoadingSpinner from './components/LoadingSpinner';

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
        Heyyy
        {this.state.isLoaded === true ? (
          <PostList posts={this.state.posts} />
        ) : (
          <LoadingSpinner />
        )}
      </div>
    );
  }
}

export default App;
