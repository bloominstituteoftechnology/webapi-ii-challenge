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

    return (
      <div className="App">
        {posts.map(post => (
          <div key={post.id}>
            <p>{post.contents}: <strong>"{post.title}"</strong></p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
