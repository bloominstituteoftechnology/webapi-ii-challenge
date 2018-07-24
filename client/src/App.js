import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios.get('/api/posts')
    .then(response => {
      this.setState({posts: response.data});
      console.log(this.state.posts);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="app">
         <h1>The posts</h1>
        <ul>
          {this.state.posts.map(post => {
            return (
              <li className="post" key={post.id}>
                <div className="post__title">{post.title}</div>
                <div className="post__contents">{post.contents}</div>
              </li>
            );
          })}
        </ul>       
      </div>
    );
  }
}

export default App;
