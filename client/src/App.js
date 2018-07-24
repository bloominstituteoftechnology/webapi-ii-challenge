import React, { Component } from 'react';
import axios from 'axios';

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

        <p className="App-intro">
          LOTR Quotes:
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
