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
    axios.get('http://localhost:9000/api/posts/')
         .then(res => this.setState({
            posts: res.data,
           }))
         .catch(err => console.dir(err));
    }, 1500)
  }

  deleteHandler = id => {
    axios.delete(`http://localhost:9000/api/posts/${id}`)
         .then(res => console.log(res.data))
         .catch(err => console.dir(err))
  }

  render() {
    if (this.state.posts !== null) {
      return (
        <div className="App">
          <h1>Lord of the Rings Quotes</h1>
          <div className='quotes'>
            {this.state.posts.map(post => <Post key={post.id} post={post} deleteHandler={this.deleteHandler}/>)}
            {/* While the above .map() is a bad dev pattern, it made my life easier */}
          </div>
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
