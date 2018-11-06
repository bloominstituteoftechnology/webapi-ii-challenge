import React, { Component } from 'react';
import axios from 'axios';
import Post from './components/Post';
class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: null
    }
  }
  componentDidMount() {
    setInterval(() => {
    axios.get('http://localhost:8999/api/posts/')
        .then(res => this.setState({
            posts: res.data,
          }))
        .catch(err => console.dir(err));
    }, 1500)
  }
  deleteHandler = id => {
    axios.delete(`http://localhost:8999/api/posts/${id}`)
        .then(res => console.log(res.data))
        .catch(err => console.dir(err))
  }
  render() {
    if (this.state.posts !== null) {
      return (
        <div className="App">
          <h1>LOTR Quotes</h1>
          <div className='quotes'>
            {this.state.posts.map(post => <Post key={post.id} post={post} deleteHandler={this.deleteHandler}/>)}
          </div>
      </div>
      );
    }
    else {
      return (
        <div style={{textAlign: 'center'}}>Retrieveing Quotes</div>
      )
    }
  }
}
export default App;
