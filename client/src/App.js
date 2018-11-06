import React, { Component } from 'react';
import axios from 'axios';

import PostWrapper from './components/PostWrapper';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentWillMount() {
    axios
      .get('http://localhost:8250/api/posts')
      .then(response => {
        this.setState({
          posts: response.data.posts
        })
      })
      .catch(error => console.log(error))
  }
  render() {
    return (
      <div className="App">
        <h1>Here are your post</h1>
        <PostWrapper posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
