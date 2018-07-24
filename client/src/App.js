import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

constructor() {
    super();
    this.state = {
      posts: [],
    };
  }
	
componentDidMount() {
    axios
      .get("http://localhost:9000/api/posts")
      .then(response => {
        console.log("GET RESPONSE: ", response);
        this.setState({ posts: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }	
	
	
render() {
    return (
      <div className="main-container">
	<h1 className="header-style">Posts</h1>	
	<div className="App">
	{this.state.posts.map(post => 
       <div className="post-container" key={post.id}>
	<p className="post-title">{post.title}</p>
	<p className="post-content">{post.contents}</p>
	</div>
      )}
    	</div>
	</div>
    );
  }
}

export default App;
