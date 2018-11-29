import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

import Posts from './components/Posts';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],

    }
  }

  componentDidMount() {
    axios
    .get('http://localhost:4000/api/posts/')
    .then(response => {
      console.log(response);
      this.setState({posts: response.data})
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
