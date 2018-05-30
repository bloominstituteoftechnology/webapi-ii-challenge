import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

class App extends Component {
  constructor(){
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:5000/api/posts")
      .then(response => {
        this.setState({posts: response.data.posts});
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <div className="App">
      <h2 className="header">Lord of the Rings Quotes</h2>
        <div className="post-list">
          {this.state.posts.map(post => {
            return(
              <div key={post.id} className="post">
                <h4>{post.title}</h4>
                <p>{post.contents}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
