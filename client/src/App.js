import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      loading: true
    }
  }
  
  componentDidMount() {
    axios
      .get('http://localhost:4001/api/posts')
      .then(response => {
        // UNCOMMENT TO SET STATE TO POSTS WITH RESPONSE
        // // this.setState({
        // //   posts: response.data
        // // })
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    return (
      <div>
        {this.state.posts.map(post => <h1>{post.title}</h1>)}
      </div>
    );
  }
}

export default App;
