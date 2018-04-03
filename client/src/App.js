import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

class App extends Component {
  state = {
    Posts: [],
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h1 className="Header">
          Some Random Post About Nothing
        </h1>
        <div className="App">
          {this.state.Posts.map(post => {
            return (
              <div className="Post__Wrapper" key={`${post.id} ${post.title}`}>
                <h4>
                  {post.title}
                </h4>
                <div>
                  {post.contents} 
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }

  getPost = () => {
    axios
      .get('http://localhost:5000/api/posts')
      .then(response => {
        this.setState({ Posts: response.data })
      })
      .catch(error => {
        console.log(error)
      });
    };  
  
  componentDidMount() {
    this.getPost()
  }
}

export default App;
