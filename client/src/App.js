import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/posts/').then(response => {
      this.setState({posts: response.data})
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="post-container">
        {
          this.state.posts.map(post => {
          return (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.contents}</p>
              <hr className="horizontal-rule"/>
            </div>
          )
          })
        }
        </div>
      </div>
    );
  }
}

export default App;
