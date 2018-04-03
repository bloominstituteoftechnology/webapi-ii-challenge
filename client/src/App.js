import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    posts:[]
  }

  componentWillMount() {
    axios.get('http://localhost:5000/api/posts')
    .then(response => {
      const posts = response.data;
      this.setState({posts});
    })
    .catch(error => {
      console.error(error);
    })
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>{this.state.posts.map(post => {
          return (
            <div>
              {post.title}
              {post.contents}
            </div>

          )
        })}</div>

      </div>
    );
  }
}

export default App;
