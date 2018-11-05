import React, { Component } from 'react';

import axios from 'axios';

import './App.css';
import headerImage from './lotr.jpg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5800/api/posts')
      .then(response => {
        console.log('response', response.data);
        this.setState({ posts: response.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        <header className="header">Welcome to LotR Quotes!</header>
        <img
          src={headerImage}
          alt="The Journey Begins"
          className="header-image"
        />
        {this.state.posts.map(post => (
          <div key={post.id}>
            <h2 className="quote">"{post.title}"</h2>
            <p className="character">-{post.contents}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
