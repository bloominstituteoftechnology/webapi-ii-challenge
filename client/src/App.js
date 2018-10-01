import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import PostContainer from './PostContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/posts')
        .then(response=> {
          console.log(response);
          this.setState({posts: response.data})
        })
        .catch(err=> {
          console.log(err);
        });
  }

  render() {
    return (
      <div className="App">
       <PostContainer posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
