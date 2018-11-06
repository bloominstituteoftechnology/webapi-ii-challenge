import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import PostsList from './PostsList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/posts")
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  }
  componentDidUpdate() {
    axios
      .get("http://localhost:8000/api/posts")
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  }
  
  render() {
    return (
      <div className="App">
        <PostsList posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
