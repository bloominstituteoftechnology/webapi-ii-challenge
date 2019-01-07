import React, { Component } from 'react';
import axios from 'axios';

import Posts from './Components/Posts'
import './App.css';

class App extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/posts')
    .then(response => {
      console.log(response)
      this.setState({ posts: response.data })
    })
    .catch(err => console.log(err));
  }


  render() {
    return (
      <div className="App">
        <Posts posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
