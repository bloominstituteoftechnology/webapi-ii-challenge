import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/posts')
      .then(res => {
        console.log(res.data)
        this.setState({posts: res.data});
        console.log(this.state)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Lambda Blog</h1>
        </header>
        <p className="App-intro">
          Posts:
        </p>
        {this.state.posts.map(post => {
          return(
            <div className="postCard" key={post.id}>
              <h2 className="postTitle">{post.title}</h2>
              <p>{post.contents}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
