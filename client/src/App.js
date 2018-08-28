import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

const url = "http://localhost:5000/api/posts";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get(url).then(response => {
      console.log(response);
      this.setState({
        posts: response.data,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Server-side Routing</h1>
        </header>
        <p className="App-intro">
          {this.state.posts.map(post => {
            return (
              post.title
            )
          })}
        </p>
      </div>
    );
  }
}

export default App;
