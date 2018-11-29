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
        this.setState({
          posts: response.data
        })
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    return (
      <div>
        {this.state.posts.map(post => <h1 key={post.id}>{post.title}</h1>)}
      </div>
    );
  }
}

export default App;
