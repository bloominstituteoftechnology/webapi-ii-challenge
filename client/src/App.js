import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      post: [],
      title: '',
      contents: ''

    }
  }

  inputChangeHandler = (ev) => {
    this.setState({[ev.target.name]: ev.target.value})
  }

  post = (ev) => {
    ev.preventDefault();
    axios
    .post(`http://localhost:5000/api/posts`, {title: this.state.title, 
                                              contents: this.state.contents})
    .then(response => {
      this.componentDidMount()})
    .catch(error => console.log(error))
  }

  componentDidMount() {
    axios
    .get(`http://localhost:5000/api/posts`)
    .then(response => this.setState({post: response.data}))
    .catch(error => console.log(error));
  }

  render() {
    console.log(this.state.post)
    return (
      <div className="App">
        {this.state.post.map(post => {
          return (
            <div>
              <h3>{post.title}</h3>
              <p>{post.contents}</p>
            </div>
          );
          
        })}
        <input name='title' onChange={this.inputChangeHandler}></input>
        <input name='contents' onChange={this.inputChangeHandler}></input>
        <button onClick={this.post}>Post</button>
      </div>
    );
  }
}

export default App;
