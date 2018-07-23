import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Posts from './components/Posts';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    axios
      .get('http://localhost:8000/api/posts')
      .then(response => this.setState({ posts: response.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Posts posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
