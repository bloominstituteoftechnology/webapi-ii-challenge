import React, { Component } from 'react';
import PostsList from './components/PostsList';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/posts/')
      .then(response => {
        console.log(response.data);
        this.setState({ posts: response.data });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="App">
        <PostsList postsData={this.state.posts}/>
      </div>
    );
  }
}

export default App;
