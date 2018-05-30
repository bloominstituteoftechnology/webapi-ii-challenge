import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state ={
      posts: []
    }
  }

   componentDidMount() {
    axios.get('http://localhost:5000/api/posts')
    .then ( post => {
      this.setState({posts: post.data.users})
      console.log("This state",this.state.posts);
    })
    .catch(error => {
      console.log(error)
    });    
   }

  render() {
    return (
      <div className="App">
      
      { this.state.posts.map(post => {
        return (
        <div key={post.id}> 
        <h3>{ post.title} </h3>
         <p>{post.contents} </p>
         </div> 
      )      
      })}      
        
      </div>
    );
  }
}

export default App;
