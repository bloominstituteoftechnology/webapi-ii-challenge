import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
  };
  };
  componentDidMount = () => {
    axios.get(`http://localhost:9000/api/posts`).then(response => {
        this.setState({ posts: response.data });
      });
  };

  render() {
    return (
      <div className="App">
      Posts
        {this.state.posts.map((post, indx) => {
          return (
            <div key={indx}>
              <h3>{post.title}</h3>
              <p>{post.contents}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
