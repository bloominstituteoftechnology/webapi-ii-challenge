import React, { Component } from 'react';
import Post from "./components/post"
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
  
      return (
        <div className="container"><h2>Node Express Lab</h2><ul>{this.state.posts.map(post => {
          return (
            <Post
              title={post.title}
              contents={post.contents}
              created={post.created_at}
              updated={post.updated_at}
              key={post.id}
        />);
          })}
            </ul>
          </div>
        );
    }
  }


export default App;
   
  
 

  