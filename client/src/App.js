import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
const newPost = {
    title: "Title from react app",
    contents: "lskjdfsd"
  }
class App extends Component {
  state = { posts:[] };

  getPost = () => {
    axios.get('http://localhost:3030/posts').then((res) => {
      console.log(res.data);
      this.setState({ posts: res.data });
    });
  }

  addPost = () => {
    axios.post('http://localhost:3030/posts', newPost).then((res) => {
      console.log(res);
    });
  }

  render() {

    return (
      <div className="App">
        <div className="buttons">
          <button onClick={() => {this.getPost()}}>Get Posts</button>
          <button onClick={() => {this.addPost()}}>Add Post</button>
        </div>
        <div className="posts">
          {this.state.posts.map((post) => {
            return (
              <div className="post">
                <div>{post.title}</div>
                <div>{post.contents}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
