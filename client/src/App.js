import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import NoteCard from './components/NoteCard'

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
    axios.get('http://localhost:5555/api/posts')
      .then( res => {
        this.setState({posts: res.data.users});
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
    axios.post('http://localhost:5555/api/posts', newPost)
      .then( res => {
        this.setState({title: '', contents: ''})
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Lambda Quotes</h1>
        </header>
        <h2 className="App-intro">
          Posts:
        </h2>
        {this.state.posts.map(post => {
          return(
            <NoteCard  
              key={post.id} 
              post={post}/>
          )
        })}
        <form onSubmit={this.addPost} className="postCard">
          <textarea 
            placeholder="Enter Quote"
            name="title"
            onChange={this.handleChange}/>
          <input
            placeholder="Enter Author"
            name="contents"
            onChange={this.handleChange}/>
          <button className="btn">+ New Post</button>
        </form>
      </div>
    );
  }
}

export default App;
