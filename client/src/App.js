import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:9000/api/posts/')
         .then(res => this.setState({
           posts: res.data,
         }))
         .catch(err => console.dir(err));
  }

  render() {
    if (this.state.posts !== null) {
      return (
        <div className="App">
          {this.state.posts.map(post => <p className='quote' key={post.id}>{post.title}</p>)}
        </div>
      );
    }
    else {
      return (
        <div style={{textAlign: 'center'}}>Loading...</div>
      )
    }
  }
}

export default App;
