import React, { Component } from 'react';
import axios from 'axios';
import Posts from './components/Posts';
import './styles/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/api/posts')
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="App">
        <h1>Lord of the Rings</h1>
        {posts.length === 0 ? <h2>Loading...</h2> : <Posts posts={posts} />}
      </div>
    );
  }
}

export default App;
