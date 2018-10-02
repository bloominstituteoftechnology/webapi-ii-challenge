import React, { Component } from 'react';
import axios from 'axios';
import PostList from './components/PostList'

 class App extends Component {
  
  state = {
    posts: [],
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/posts')
    .then(response => {
      console.log (`the response is ${response}`);
      this.setState({posts: response.data});
    })
    .catch(err => console.log(err)); 
  }

  render() {
    return (
      <div>
        <h1>Post Feed</h1>
        <PostList posts={this.state.posts} />
      </div>
    );
  }

}
 export default App;