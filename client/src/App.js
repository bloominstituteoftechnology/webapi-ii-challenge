import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      post: {
        title: '',
        contents: '',
      }   
    }
  }

  addPost = e => {
    e.preventDefault();
    const newPost = this.state.post;
    axios
      .post('http://localhost:8000/api/posts', newPost)
      .then(response => {
        console.log(response);
        
      })
      .catch(err => {
        console.log(err);
      })  
  }

  handleInputChange = e => {
    this.setState({ post: {[e.target.name]: e.target.value} });
  };

  componentDidMount(){
    axios
      .get('http://localhost:8000/api/posts')
      .then(response => {
        console.log(response);
        this.setState({ posts: response.data })
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  render() {
    return (
      <div className="App">
        {
          this.state.posts.map(post => {
            return (
            <div key={post.id}>
              <div>{post.title}</div>
              <div>{post.contents}</div>
            </div>
            )
          })
        }
        <form>
          <input
            onChange={this.handleInputChange}
            placeholder="title"
            value={this.state.post.title}
            name="title"
          />
          <textarea
            onChange={this.handleInputChange}
            placeholder="contents"
            value={this.state.post.contents}
            name="contents"
          />
          <button onClick={this.addPost} type="submit">Add Post</button>
        </form>
      </div>
    );
  }
}

export default App;
