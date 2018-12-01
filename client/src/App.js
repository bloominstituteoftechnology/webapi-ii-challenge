import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Posts from './components/Post';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
      posts: [],
    };
  }
componentDidMount() {
axios.get(`http://localhost:4000/api/posts`)
  .then(response => {
    const posts = response.data;
    this.setState({posts}); 
  }) 
  .catch(err=> {
    console.log(err)
  });
}
  render() {
    return (
      <div className="App">
      <h1>Guess who said that!</h1>
      <Posts posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
