import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import PostsList from './components/PostsList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/posts")
      .then(response => this.setState({ posts: response.data }))
      .catch(error => console.log(error));
  }


  render() {
    return (
      <div className="App">
            {this.state.posts.map(post => (
              <PostsList key={post.id} post={post}/>
            ))}
      </div>
    );
  }
}

export default App;
