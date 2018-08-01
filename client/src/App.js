import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      title: '',
      contents: ''
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8000/api/posts')
      .then((response) => this.setState({ posts: response.data }))
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.posts.map((post) => (
          <div key={post.id}>
            <div>{post.title}</div>
            <div>{post.contents}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
