import React, { Component } from 'react';

import axios from 'axios';

import Post from './Post';

import './App.css';

const ROOT_URL = `http://localhost:5000/api/posts`;

class App extends Component {
  state = {
    Posts : [],
  }

  render() {
    return (
      <div className="App">
        {this.state.Posts.map(post => <Post key={post.id} post={post}/>)}
      </div>
    );
  }

  componentDidMount(){
    this.getPosts();
  }

  getPosts = () => {
    axios
      .get(ROOT_URL)
      .then(response => {
        const posts = response.data;
        this.setState({Posts: posts});
    }).catch(err => {
      //Handle errors
    });
  }
}

export default App;
