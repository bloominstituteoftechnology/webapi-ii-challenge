import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

//implment code to connect to the /api/posts endpoint and show list of posts
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      title: '',
      contents: '',
    }
  }

  componentDidMount() {
    this.listPosts();
  }
  listPosts = () => {
    axios.get(`http://localhost:5000/api/posts`)
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
      <h1>Guess Who Said This</h1>
      {this.state.posts.map(junk => {
        return (
          <div className='frotocard'>
          <div className='title'> { junk.title }</div>
          <div className='contents'> { junk.contents }</div>
          </div>
        )
      })}
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
      </div>
    );
  }
}

export default App;
