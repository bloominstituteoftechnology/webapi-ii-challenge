import React, { Component } from 'react';

import axios from 'axios';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      postsData: [],
      post: {
        title: '',
        content: ''
      }
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get('http://localhost:5800/posts')
      .then(response => {
        console.log('response', response.data.posts);
        this.setState({ posts: response.data.posts });
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">Welcome to Hobbiton!</header>
      </div>
    );
  }
}

export default App;
