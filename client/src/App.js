import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      title: '',
      contents: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/posts')
      .then(response => {
        console.log('cdm', response)
        this.setState({ posts: response.data })
      })
      .catch(err => {
        console.error('cdm error', err)
      });
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  handleSubmit = event => {
    event.preventDefault();
    const { title, contents } = this.state;
    const newPost = {
      title,
      contents
    }

    axios.post('http://localhost:5000/api/posts', newPost)
    .then(response => {
      this.setState({ posts: response.data, title: '', contents: '' })      
    })
    .catch(err => {
      console.error(err)
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form onSubmit={this.handleSubmit} >
        <input 
            type="text" 
            name="title" 
            className="input"
            value={this.state.title} 
            placeholder="Add title"
            onChange={this.handleInputChange}
          />
          <input 
            type="text" 
            name="contents" 
            className="input"
            value={this.state.contents} 
            placeholder="Add contents"
            onChange={this.handleInputChange}
          />
          <button>Add New Post</button>
        </form>
        {this.state.posts.map((post, index) => {
          return <Post 
            id={post.id}
            key={post.id}
            title={post.title}
            contents={post.contents}
          />
        })}
      </div>
    );
  }
}

export default App;
