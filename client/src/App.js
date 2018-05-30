import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios 
      .get('http://localhost:5555/api/posts/')
      .then(response => {
        this.setState({ posts: response.data })
      })
      .catch(error => {
        console.log("ERROR:", error)
      })
  }

  render() {
    console.log("Posts:", this.state.posts)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to some LOTR stuff:</h1>
        </header>
        <p className="App-intro">
          {this.state.posts.map(post => {
            return (
              <div>
                {post.title}
              </div>
            )
          })}
        </p>
      </div>
    );
  }
}

export default App;
