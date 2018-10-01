import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      postsData: [],
      post: {
        title: '',
        contents: ''
      }
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/posts')
    .then(response => {
      this.setState({ postsData: response.data })
    })
    .catch(err => {
      console.log(err, 'Oops!');
    })
  }

  render() {
    return (
      <div className="App">
      <h1>Hello</h1>
     
        <div className="posts-list-wrapper">
        {  
                    this.state.postsData.map(post => (
                    <div className="post-card" key={post.id}>
                        <h4>
                        {post.title}
                        </h4>
                        <p>{post.contents}</p>
                    </div> 
                ))
                
                }
        </div>
    
        
      </div>
    );
  }
}

export default App;
