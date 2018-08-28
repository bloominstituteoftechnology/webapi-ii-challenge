import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Post from './components/Post';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:5000/api/posts/')
      .then(response => {
        this.setState({posts: response.data})
        console.log(response)
      })
  }

  render() {
    if (this.state.posts.length > 0) {
    return (
      <div className="App">
        <h1>My Awesome Posts</h1>
        {this.state.posts.map(post => <Post post={post} key={post.created_at} />)}
      </div>
    );
  } else {
    return (<div>Loading...</div>)
  }
  }
}

export default App;
