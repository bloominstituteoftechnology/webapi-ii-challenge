import React, { Component } from 'react';
import './App.css';
import axios from "axios"

class App extends Component {
  constructor(){
    super();
    this.state={
      posts: []
    };
  }
  componentDidMount() {
    axios
    .get('http://localhost:9000/api/posts')
    .then(response => this.setState({ posts: response.data }))
    .catch(error => console.log(error))
  }
  render() {
    return (
      <div className="App">
        {this.state.posts.map(post => 
          <div key={post.id}>
            <p>{post.title}</p>
            <h4>{post.contents}</h4>
          </div>
        )}
      </div>
    );
  }
}

export default App;
