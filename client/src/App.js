import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts:null
    }
  }

  componentDidMount () {
    axios.get('http://localhost:8000/api/posts/')
    .then(res => this.setState ({
      posts:res.data,
    }))
    .catch(err => console.log('This Is Your', err))
  }


  render() {
    if (this.state.posts !== null) {
      return (
        <div className="App">
        <h1>Guess Who Said</h1>
          {this.state.posts.map(post => <p key={post.id}>{post.title}</p>)}
        </div>
      );
    }
    else {
      return (
        <div style={{textAlign: 'center'}}>Loading...</div>
      )
    }
  }
}
 export default App;