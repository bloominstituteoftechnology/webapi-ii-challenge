import React, { Component } from 'react';
//import ListPosts from "./components/listPosts"
import Post from "./components/post"
//import Posts from "./components/posts"
//import { Route } from 'react-router-dom';
import axios from "axios";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
   posts: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/api/posts')
      .then(response => {
        this.setState(() => ({ posts: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }
 

  render() {
  console.log("this.state", this.state)
      return (
        <div className="container"><h2>Node Express Lab</h2><ul>{this.state.posts.map(post => {
          return (
            <Post
              title={post.title}
              contents={post.contents}
              key={post.id}
        />);
          })}
            </ul>
          </div>
        );
    }
  }


export default App;
   
  
 

  