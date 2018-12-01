import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const URL = 'http://localhost:9000/api/posts';
    axios.get(URL)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { posts } = this.state;
    const post = posts.map(post => {
      return (
        <div key={post.id}>
          <p>{post.contents}: <strong>"{post.title}"</strong></p>
        </div>
      );
    });

    return (
      <div className="App">
        {post}
      </div>
    );
  }
}

export default App;
