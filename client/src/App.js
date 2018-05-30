import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/posts`)
      .then((response) => {
        console.log(response.data.users);
        this.setState( Object.assign({}, this.state, {posts: response.data.users}) );
        console.log(this.state.posts);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.posts.map(post => {
          return(
            <div className='post' key={post.id}>
              <h3 className='title'>{post.title}</h3>
              <p className='content'>{post.contents}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;