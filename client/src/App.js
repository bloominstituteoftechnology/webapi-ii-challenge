import React, { Component } from 'react';
import PostsList from './components/PostsList';
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
      .get(`http://localhost:5555/api/posts`)
      .then((response) => {
        console.log("DATA", response.data);
        this.setState({...this.state, posts: response.data.posts});
        console.log("STATE", this.state)
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        </p>
        <div className='container'>
          <PostsList posts={this.state.posts}/>
        </div>
      </div>
    );
  }
}

export default App;
