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

  componentDidMount(){
    axios.get('http://localhost:4000/api/posts')
    .then(response => {
      this.setState({
        posts: response.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  };

  render() {
    return (
      <div className="App">
      <p>Here's some posts {console.log(this.state.posts)}</p>
        {this.state.posts.map(post => {
          console.log(post)
          return (
            <div className='post'>
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
