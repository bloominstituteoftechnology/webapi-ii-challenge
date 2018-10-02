import React, { Component } from 'react';
 import './App.css';
import axios from "axios";
//URL = "http://localhost:3333/posts";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  } 
  componentDidMount(){
    axios.get("http://localhost:3333/posts").then(response => {
      this.setState({ posts: response.data });
    });
    }
  
  render(){
    return (
      this.state.posts.map((post, index)=>{
        return <div className="App">
            <header className="App-header">
              <h1 className="App-title">{post.title}</h1>
            <h3 className="post">{post.contents}</h3>
            </header>
          </div>;

      })
    )
  }
}

export default App;
 