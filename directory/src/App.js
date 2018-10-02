import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
// import logo from './logo.svg';
import './App.css';



class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      post: {
        title: '',
        contents: '',
      },
      post:''
    };
    console.log(this.state);
  }

  componentDidMount() {
    console.log('working');
    axios
    .get('http://localhost:8000/api/posts')
    .then((response) => {
     this.setState({ posts: response.data})
     console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p> */}
          {this.state.posts.map(post => 
        <Post key={post.id} post={post} />
        )}
        </header>
      </div>
    );
  }
}

export default App;
