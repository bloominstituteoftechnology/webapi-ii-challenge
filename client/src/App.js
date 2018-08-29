import React, { Component } from 'react';
import axios from 'axios'; 

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts : [],
    }
  }

  componentDidMount() {
    this.fetchPosts()
  }

  fetchPosts = () => {
    const promise = axios.get('http://localhost:9000/api/posts')
      promise.then(response => {
        this.setState({posts: response.data})
      })
      .catch(error => {
        console.error('Server Error', error)
      })
  }


  render() {
    console.log(this.state.posts)
    return (
      <div className="App">
        {this.state.posts.map((post, i) => <div key ={i}>{post.title}{post.contents}</div>)}
      </div>
    );
  }
}

export default App;
