import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';
import Card from './Card.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      title: '',
      contents: ''
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/posts')
      .then( res => {
        this.setState({ posts: res.data.users });
      })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  addPost = () => {
    const newPost = {
      title: this.state.title,
      contents: this.state.contents
    }
    axios.post('http://localhost:5000/api/posts', newPost)
      .then( res => {
        this.setState({ title: '', contents: ''})
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Movie Quotes</h1>
        </header>
        <h3>Posts:</h3>
        {this.state.posts.map(post => {
          return(
            <Card key={post.id}
              post={post} />
          )
        })}
      
        <form onSubmit={this.addPost}>
          <textarea
            placeHolder="Enter quote"
            name="title"
            onChange={this.handleChange} />
          <input
            placeHolder="Enter author"
            name="contents"
            onChange={this.handleChange} />
          <button>Add Post</button>
        </form>    
      </div>
    );
  }
}

export default App;