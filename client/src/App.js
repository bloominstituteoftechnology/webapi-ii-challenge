import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super()
    this.state = {
    posts: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5555/api/posts')
    .then(res => {
      this.setState({ posts: res.data.posts })
    })
  }


  render() {
    return (
      <div className="App">
    {this.state.posts.map(post => {
      return(
        <div>
         <p>{post.title}</p>
         <p>{post.contents}</p>
          </div>
      )
    })}
      </div>
    );
  }
}

export default App;
