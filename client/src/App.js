import React, { Component } from 'react';

import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      posts: [],
    }
  }

  componentDidMount(){
    axios 
    .get(`http://localhost:5000/api/posts/`)
    .then(response => {
        this.setState({ posts: response.data })
    })
    .catch(err => {
      console.log("Fail to GET Posts from local server", err)
    })
  }

  render() {
    console.log(this.state.posts)
    return (
      <div className="App">
          <h1>Post List</h1>
          {this.state.posts.map(post => {
            return (
              <h2>{post.title}</h2>
            )
          })}
      </div>
    );
  }
}

export default App;
