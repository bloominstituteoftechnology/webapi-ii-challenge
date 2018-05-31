import React, { Component } from 'react';
import logo from './logo.svg';
import ring from './oneringGIF.gif';
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
          <img src={ring} className="App-logo" alt="logo" />
          <h1 className="App-title">LOTR Quotes:</h1>
        </header>
        <p className="body">
          {this.state.posts.map(post => {
            return (
              <div>
                <h3 className="lotr-quote">{post.title}</h3>
                <p className="who-said-it">{post.contents}</p>
              </div>
            )
          })}
        </p>
      </div>
    );
  }
}

export default App;
