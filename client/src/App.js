import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
 constructor() {
   super();
   this.state={
     posts:[]
   }
 } 

 componentDidMount() {
   axios.get('http://localhost:8000/api/posts')
   .then(res=>
    this.setState({posts:res.data})
   )
   .catch(err=>console.log(err, "We failed to retrieve these posts"))
 }

render() {
if (this.state.posts.length===0) {
  return <h1>Retrieving posts...</h1>
} else {
    return (
      <div className="App">
      {this.state.posts.map(post=>{
        return (
          <div className="post-card" key={post.id}>
          <h2 className="post-title">{post.title}</h2>
          <h3 className="post-contents">{post.contents}</h3>
          </div>
        )
      })}
      </div>
    );
  }
}
}

export default App;
