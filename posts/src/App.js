import React, { Component } from 'react';
import axios from 'axios';
import Posts from './components/Posts';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:8000/api/posts')
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(err => console.log('ERR:', err));
  }

  render() {
    return (
      <div>
        <Posts posts={this.state.posts} />;
      </div>
    );
  }
}

export default App;
