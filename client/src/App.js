import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8000/api/posts`)
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        {this.state.posts.map(post => {
          return <div>{post.title}: {post.contents}</div>
        })}
      </div>
    );
  }
}

export default App;
