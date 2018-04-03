import React, { Component } from 'react';
import './App.css';
import BlogPosts from './Posts';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
    .get('http://localhost:5500/api/posts')
    .then(res => {
      this.setState({ posts: res.data });
    })
    .catch(error => {
      console.log('There was an error retrieving posts');
    });
  }

  render() {
    return (
      <div className="App">
      <h3>Node Nerd Blog</h3>        
        {this.state.posts.map((post, id) => {
          return (
            <div key={id}>
            <BlogPosts postings={post} />
            </div>
          );
        })}        
      </div>
    );
  }
}

export default App;
