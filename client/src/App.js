import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const url = 'http://localhost:9000/api/posts/';

class App extends Component {
  constructor () {
    super();
    this.state = {
      postData: []
    }
  }

  componentDidMount() {
    axios.get(url)
    .then(res => {
      console.log(res.data)
      this.setState({ postData: res.data })
    })
    .catch(err => {
      console.log(err, 'Oops!');
    })
  }
  render() {
    console.log(this.state.postData)
    return (
      <div className="App">
        {this.state.postData.map(post => 
        <div key={post.id}>
            <h4>Title: {post.title}</h4>
            <p>{post.contents}:</p>
            </div>
          )}
      </div>
    );
  }
}

export default App;
