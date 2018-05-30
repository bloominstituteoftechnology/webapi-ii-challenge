import React, { Component } from 'react';
import axios from 'axios';
import PostsList from './PostsList.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      posts: [],
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/posts')
    .then(response => {
      this.setState({ posts: response.data.posts })
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Node Express Lab</h1>
          </header>
        </div>
        <div className="card-container">
          <PostsList posts={this.state.posts}/>
        </div>
      </div>
    );
  }
}

export default App;
