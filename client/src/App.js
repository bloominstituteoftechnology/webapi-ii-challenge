import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:9000/api/posts')
      .then(response => {
        this.setState(({
          posts: response.data
        }))
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        {this.state.posts.map(post => {
          return (
            <div>
              <h1>{post.title}</h1>
              <p>{post.contents}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
