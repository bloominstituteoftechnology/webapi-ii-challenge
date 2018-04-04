import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios
    .get("http://localhost:3000/api/posts/")
    .then(response => this.setState({ posts: response }))
  }

  
  render() {
    return (
      <div>
        {this.state.posts.map(post => {
          return( 
            <div key={post.id}>
              <h1>{post.contents}</h1>
              <p>{post.title}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
