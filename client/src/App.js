import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/posts')
      
      .then(response => {
        // console.log(response)
        setTimeout(() => { this.setState({posts: response.data})},2000)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {

    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">User Posts</h1>
        </header>

        {!this.state.posts ? (<img src={logo} className="App-logo" alt="logo" />) : 
          (this.state.posts.map((post, index) => 
              (<div className="postStyles" key={index + post.title}>
                  <div>
                    <button className="btnStyles">edit</button>
                    <button className="btnStyles">delete</button>
                  </div>
                  <h4>{post.title}</h4>
                  <p>{post.contents}</p>
                
              </div>)
          ))
        }
      
      </div>
    );
  }
}

export default App;

