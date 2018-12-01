import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: {}
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/posts/')
    .then(posts => {
      console.log(posts);
      this.setState({
        posts: posts.data,
      })
    })
    .catch(()=> {
      console.log('Something went wrong!');
    })
  }

  render() {
    if (this.state.posts.length) {
      return (
        <div className="App">
          {this.state.posts.map(post => {
            return <div><p>{post.title}</p><p>{post.contents}</p></div>
          })}
        </div>
      );
    }
    else {
      return(
        <h1>Loading Data</h1>
      )
    }
  }
}

export default App;
