import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/posts')
      .then(response => {
        console.log(response);
        this.setState({posts: response.data});
      })
  }
  render() {
    return (
      <div className="App">
        {this.state.posts.map(post => 
        <div className='post'>
          <h1>{post.title}</h1>
          <p>{post.contents}</p>
        </div>
        )}
      </div>
    );
  }
}

export default App;
